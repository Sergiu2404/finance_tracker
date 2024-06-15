import express, { Request, Response } from "express";

import FinancialRecordModel from "../schema/FinancialRecord";

const router = express.Router();

router.get('/getAllByUserID/:userId', async (request, response) => {
    try{
        const userId = request.params.userId;
        const records = await FinancialRecordModel.find({ userId: userId });

        if(records.length === 0){
            return response.status(404).send("no records found for the user");
        }

        response.status(200).send(records);
    } catch(error){
        response.status(500).send(error);
    }
});

router.post('/', async (request, response) => {
    try{
        const newRecordBody = request.body;
        const newRecord = new FinancialRecordModel(newRecordBody);

        const savedRecord = await newRecord.save();
        response.status(200).send(savedRecord);
    } catch(error){
        response.status(500).send(error);
    }
});

router.put('/:id', async (request, response) => {
    try{
        const id = request.params.id;
        const newRecordBody = request.body;
        const record = await FinancialRecordModel.findByIdAndUpdate(
            id,
            newRecordBody,
            { new: true }
        )

        if(!record)
            return response.status(404).send();

        response.status(200).send(record);
    } catch(error){
        response.status(500).send(error);
    }
});

router.delete('/:id', async (request, response) => {
    try{
        const id = request.params.id;
        const record = await FinancialRecordModel.findByIdAndDelete(id);

        if(!record)
            return response.status(404).send();

        response.status(200).send(record);
    } catch(error){
        response.status(500).send(error);
    }
});



export default router;