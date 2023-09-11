import express from "express";
import pgp from "pg-promise";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import flash from "flash-express";
import BookingsDBLogic from "./database/databaseLogic.js";
import DBJS from "./database.js"
import BookingFunction from "./services/restaurant.js"

const app = express()
let database = BookingsDBLogic(DBJS)
let bookingFunction = BookingFunction(database) 
let availableBook
let tableId
let numberOfPeople
let inputUserName
let phonenumber
let allTheBookings


app.use(express.static('public'));
app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const handlebarSetup = exphbs.engine({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.get("/",  async (req, res) => {

    availableBook = await bookingFunction.getTables()
    res.render('index', { tables : availableBook,
        theError: await bookingFunction.error(tableId,numberOfPeople)})
});

app.post("/book", async (req,res) => {
    tableId = req.body.tableId
    numberOfPeople = req.body.booking_size
    inputUserName = req.body.username
    phonenumber = req.body.phone_number

 await bookingFunction.bookATable(inputUserName,numberOfPeople,phonenumber,tableId)
 

    res.redirect("/")
})

app.get("/bookings", async(req, res) => {
    allTheBookings = await bookingFunction.getBookedTables()

    res.render('bookings', { bookedTables : allTheBookings})
});


var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('🚀  server listening on:', portNumber);
});