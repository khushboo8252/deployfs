const express = require("express");
const {connection}=require("./db");
const { userRouter } = require("./routes/userRoutes");
const {noteRouter} = require("./routes/noteRoutes")
const dotenv=require("dotenv").config();
const cors=require("cors")

const app = express();
const port = process.env.port;
app.use(cors());

app.use(express.json());
app.use("/user",userRouter);
app.use("/note",noteRouter);


app.get("/",(req,res)=>{
    res.send("home page")
})


app.listen(port,async()=>{
   try {
    await connection
    console.log(`server is running on port ${port} and db is connected`)
   } catch (error) {
    console.log(error)
   }
})