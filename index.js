import express  from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()



const connection = async () => {

    try {
      await mongoose.connect(process.env.MONGO_DB);
      console.log('is connected mongo db');
    } catch (error) {
      throw error
    }
}

mongoose.connection.on('disconnected', ()=>{
  console.log('mongoDB disconnected!');
})

//middleware
app.use(cookieParser())
app.use(express.json())

app.use("/api", userRoute)

app.use((err, req, res, next) =>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "something went wrong"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})
const port = process.env.PORT || 4000

app.listen(port, ()=>
{
connection()
console.log(`puerto ${port}`
)})


