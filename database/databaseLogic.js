// create getAvailableTable to add query to select all the tables with column booked=false
// create bookTable function update the existing details to that of the oesron making the booking and setting the booked to true
// create get booked tabkes to get all the booked tables from the table
// create getUserDetails to select all the booked tables of user
// create cancel function to update the booked column to be false so that the table now becomes not booked and shows under not booked
//return all the functions and eexport them as a module

export default function BookingsDBLogic(database){

    async function getAvailableTables(){
        let result = await database.any('SELECT * FROM table_booking WHERE booked = false')
        return result
    }

    async function bookTable(theUser,peopleNumber,contact,tableId){
        await database.any('UPDATE table_booking SET booked = true, username = $1, number_of_people = $2, contact_number = $3 WHERE id = $4', [theUser,peopleNumber,contact,tableId] )
    }

    async function getBookedTables(){
        let result = await database.any('SELECT * FROM table_booking WHERE booked = true')
        return result
    }
    async function getTableById(theId){
        let result = await database.any('SELECT * FROM table_booking WHERE id = $1', [theId])
        return result
    }

    async function cancel(tableName){
        await database.none("UPDATE table_booking SET booked = false, username = 'sisi' WHERE table_name = $1",[tableName])
    }
    async function getUserDetails(theUser){
        let result = await database.any('SELECT * FROM table_booking WHERE username = $1', [theUser])
        return result
    }
    return{
        getAvailableTables,
        bookTable,
        getBookedTables,
        cancel,
        getTableById,
        getUserDetails
    }
}