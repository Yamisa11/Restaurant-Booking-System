/* 
import and instantiate my database and logic factory functions
declare my variables availableBook, tableId ,numberOfPeople, inputUserName, phonenumber, allTheBookings, successMsg
-use getTable function to retrieve all the available tables from the database and assign the results to availableBook. render the results so to display on index handlebars
-Pst route: Get inputs using req.body and assign them to the variables. Use the variables as parameters to the bookATable
-Bookings route: use getBookedTables function to retrieve all the booked tables and render the results to bookings handlabars
-to cancel a table use table name as rapam to target which table to update. Then use cancelTableBooking function
-to get tables from a user use route that will target the username to check for tables under that user
    use getBookedTablesForUser to get the tables
*/

//importing modules
import express from "express";
import pgp from "pg-promise";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import flash from "flash-express";
import BookingsDBLogic from "./database/databaseLogic.js";
import DBJS from "./database.js";
import BookingFunction from "./services/restaurant.js";

// instantianting modules
const app = express();
let database = BookingsDBLogic(DBJS);
let bookingFunction = BookingFunction(database);

// variable declaration
let availableBook;
let tableId;
let numberOfPeople;
let inputUserName;
let phonenumber;
let allTheBookings;
let successMsg;

app.use(express.static("public"));
app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const handlebarSetup = exphbs.engine({
  partialsDir: "./views/partials",
  viewPath: "./views",
  layoutsDir: "./views/layouts",
});

app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");

// index route to show available tables and book them
app.get("/", async (req, res) => {
  availableBook = await bookingFunction.getTables();
  res.render("index", {
    tables: availableBook,
    // theError: await bookingFunction.error(tableId, numberOfPeople),
    successMsg: successMsg,
  });
});

app.post("/book", async (req, res) => {
  tableId = req.body.tableId;
  numberOfPeople = req.body.booking_size;
  inputUserName = req.body.username;
  phonenumber = req.body.phone_number;

  await bookingFunction.bookATable(
    inputUserName,
    numberOfPeople,
    phonenumber,
    tableId
  );

  res.redirect("/");
});
// getting all the bookings that have been made and rendering the results to bookings
app.get("/bookings", async (req, res) => {
  allTheBookings = await bookingFunction.getBookedTables();

  res.render("bookings", { bookedTables: allTheBookings });
});
// to cancel a table reservation
app.post("/cancel/:tableName", async (req, res) => {
  let table_name = req.params.tableName;
  bookingFunction.cancelTableBooking(table_name);
  successMsg = bookingFunction.success();
  res.redirect("/bookings");
});

app.get("/bookings/:username", async (req, res) => {
  let username = req.params.username;
  let details = await bookingFunction.getBookedTablesForUser(username);

  res.render("userBookings", {
    theUser: username,
    theDetails: details,
  });
});

var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
  console.log("🚀  server listening on:", portNumber);
});
