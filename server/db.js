import pkg from 'pg'
import 'dotenv/config'
const {Pool} = pkg

const dbp = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'todo',
   password: process.env.DB_PASSWORD,
   port: 5432
})

export default dbp