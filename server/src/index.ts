// pswd: l5BMvLsxd1oJ35E7

import express, { Express } from "express";
import mongoose from "mongoose";
import cors from 'cors';
import FinancialRecordRouter from "./routes/FinancialRecord";

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // middleware for using json
app.use(cors()); // Enable CORS


const mongoURI: string = 'mongodb+srv://sergiugoian2404:l5BMvLsxd1oJ35E7@financetracker.hownaif.mongodb.net/';

mongoose.connect(mongoURI)
.then(() => {
    console.log("connected to mongo...");
})
.catch((error) => {console.error("Could not connect to db...", error)});


app.use("/financialRecords", FinancialRecordRouter);





app.listen(PORT, () => {
    console.log(`server connected on port ${PORT}...`);
});