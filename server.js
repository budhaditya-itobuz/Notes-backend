import express, { Router } from "express"
import dotenv from "dotenv"
import noteRouter from "./src/routes/noteRoutes.js"
import userRouter from "./src/routes/userRoutes.js"
import mongoose from "mongoose"

dotenv.config()
const port = process.env.PORT
const mongooseUrl = process.env.MONGOOSE_URL

const app = express()
app.use(express.json())


const connect = async () => {
    await mongoose.connect(mongooseUrl);
}


connect().catch(err => console.log(err));

app.use("/note", noteRouter)

app.use("/user",userRouter)

app.listen(port, () => {
    console.log(`app is running on port no ${port}`)
})




