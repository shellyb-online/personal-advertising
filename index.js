import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import advertRouter from "./routes/advertroutes.js";
import userRouter from "./routes/userroutes.js";

await mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use(cors());

app.use(advertRouter);
app.use(userRouter);

app.listen(3001, () =>{
    console.log("ports are listening to port 3001");
});