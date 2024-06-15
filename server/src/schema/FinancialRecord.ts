import mongoose from "mongoose";

interface FinancialRecord {
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

const FinancialRecordSchema = new mongoose.Schema<FinancialRecord>({
    userId: {
        type: String, required: true
    },
    date: {
        type: Date, required: true
    },
    description: {
        type: String, required: true
    },
    amount: {
        type: Number, required: true
    },
    category: {
        type: String, required: true
    },
    paymentMethod: {
        type: String, required: true
    },
});


const FinancialRecordModel = mongoose.model<FinancialRecord>(
    'FinancialRecord', //name of the table
     FinancialRecordSchema //schema of the table
);

export default FinancialRecordModel;