import express from "express";
import dotenv from "dotenv";
import morgan from 'morgan';
import api from './routes/api/index.js';
import connectToDb from './db/db.js';
import cors from 'cors';

import path from 'path';
import {fileURLToPath} from "url";

//Resolving dirname for ES module
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

dotenv.config();

const app=express()

//database
connectToDb();

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//rest api
// app.get('/',(req,res) =>{
//     res.send({
//         message:"Welcome to ecommerce app"
//     })
// })
app.use("/api", api);

//Use the client app
app.use(express.static(path.join(__dirname,'/frontend/build')))

//Render client for path
app.get("*",(req,res) =>
    res.sendFile(path.join(__dirname,"/frontend/build/index.html"))
);

const PORT = process.env.PORT||8080;

app.listen(PORT,() => {
    console.log(`Server Running on port ${PORT}`);
})