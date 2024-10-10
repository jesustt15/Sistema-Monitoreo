const {Pool} = require('pg')


const pool = new Pool({
    user: 'postgres',
    password: 'Admin2024',
    host: 'localhost',
    port: 5432,
    database: 'sensordb'
    
})

module.exports = pool;