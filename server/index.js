import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './router/router.js'
import errorMiddleware from './middlewares/error-middleware.js'

const PORT = process.env.PORT || 3300
const app = express()
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/api', router)
app.use(errorMiddleware)

app.listen(PORT, () => {
   console.log(`Server is running on http://locahost:${PORT}`);
})