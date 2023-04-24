import {readdirSync} from "fs";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const morgan = require("morgan");
require("dotenv").config();


const app = express();

//Set up the database connection
mongoose.connect(process.env.DATABASE)
    .then(()=>{console.log("database connected")})

//apply some middlewares with .use();
app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({extended:true}));
app.use(cors({
	origin:["http://localhost:3000"]
}))

//post request for registering the user
readdirSync(`./routes`).map((r)=>app.use(`/ep`, require(`./routes/${r}`)))

//create the port
const port = process.env.PORT
		app.listen(port,()=>{
        console.log("server running")})
