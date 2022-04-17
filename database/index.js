const mysql = require('mysql')
const database = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'mi-shop'
})
module.exports = database