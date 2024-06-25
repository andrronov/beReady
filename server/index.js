import express from 'express'
// import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './router/router.js'
import errorMiddleware from './middlewares/error-middleware.js'

const PORT = process.env.PORT || 3300
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
   credentials: true,
   origin: process.env.VITE_SITE || 'http://localhost:5173'
}));
app.use('/api', router)
app.use(errorMiddleware)
// app.use(bodyParser.json())


app.listen(PORT, () => {
   console.log(`Server is running on http://locahost:${PORT}`);
})