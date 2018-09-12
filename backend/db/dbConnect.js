const mysql = require('mysql')
const fs = require('fs')
const path = require('path')

/*
    host - DB host
    user - DB user
    pass - user password for DB
    db  - name of the DB
*/

class dbConnect {

    constructor(host, user, pass, database) {
        this.host = host
        this.user = user
        this.password = pass
        this.db = database
        this.connPool = this.connection()
    }

    connection() {
        let pool = mysql.createPool({
            connectionLimit: 10,
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        })

        console.log('connected to the DB')
        return pool
    }
}


let server = ''
let userName = ''
let password = ''
let schema = ''

const credentials = fs.readFileSync(__dirname + '/credentials.txt', 'utf8')

server = credentials.split('\n')[0].trim()
userName = credentials.split('\n')[1].trim()
password = credentials.split('\n')[2].trim()
schema = credentials.split('\n')[3].trim()

const db = new dbConnect(server, userName, password, schema)
module.exports = db