const restaurant = (db) => {
let availableTables
let bookedTables
let theTable
    async function getTables() {
        // get all the available tables
        availableTables = await db.getAvailableTables()
        return availableTables
    }

    async function bookATable(theUser,peopleNumber,contact,tableId) {

    if (error(tableId,peopleNumber) == "") {
        await db.bookTable(theUser,peopleNumber,contact,tableId)
    }
     
    }

    async function getBookedTables() {
        // get all the booked tables
        bookedTables = await db.getBookedTables()
        return bookedTables
    }

    async function isTableBooked(tableName) {
        // get booked table by name
        bookedTables = await db.getBookedTables()

        if (bookedTables.length > 0){
            return true
        }else{
            return false
        }
    }

    async function cancelTableBooking(tableName) {
        // cancel a table by name
        await db.cancel(tableName)
    }

    async function getBookedTablesForUser(username) {
        // get user table booking
       
    }

   async function error(tableId,peopleNumber){
    let errorMsg = ""
        theTable = await db.getTableById(tableId)
   for (let i = 0; i < theTable.length; i++) {
    const element = theTable[i];
    if (element.capacity < peopleNumber) {
        errorMsg = "Number of people exceed capacity"
    }
   
   }
   return errorMsg

    }

    return {
        getTables,
        bookATable,
        getBookedTables,
        isTableBooked,
        cancelTableBooking,
        getBookedTablesForUser,
        error
    }
}

export default restaurant;