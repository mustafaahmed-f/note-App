
// const mysql2 = require('mysql2');
import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
    host:'localhost' ,
    user:'root',
    password:'',
    database : 'assignment4'
})

// module.exports = connection
export default connection