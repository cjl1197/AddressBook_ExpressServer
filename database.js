import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
     
}).promise()

export async function getUsers() {
    const [users] = await pool.query("SELECT *, CONCAT(first_name, ' ', last_name) AS full_name FROM contacts ORDER BY last_name")
    return users
}

export async function getUser(id) {
    const [user] = await pool.query(
        "SELECT * FROM contacts WHERE id = ?", [id])
    return user[0]
}

export async function createUser(first_name, last_name) {
    const [result] = await pool.query("INSERT INTO contacts (first_name, last_name) VALUE (?, ?)", [first_name, last_name])
    const id = result.insertId
    return getUser(id)
}
