

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
        await database.any('DELETE FROM table_booking WHERE table_name = $1',[tableName])
    }
    return{
        getAvailableTables,
        bookTable,
        getBookedTables,
        cancel,
        getTableById
    }
}