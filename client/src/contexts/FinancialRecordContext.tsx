import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";


export interface FinancialRecord {
    _id?: string
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

interface FinancialRecordsContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<FinancialRecordsContextType | undefined>(undefined);
export const FinancialRecordsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [records, setRecords] = useState<FinancialRecord[]>([]);
    const {user} = useUser();

    const fetchRecords = async () => {
        if(!user) return;

        const response = await fetch(`http://localhost:3001/financialRecords/getAllByUserID/${user.id}`);

        if(response.ok){
            const records = await response.json();
            console.log(records);
            setRecords(records);
        }
    }

    useEffect(() => {
        fetchRecords();
    }, [user]);

    const addRecord = async (record: FinancialRecord) => {
        const response = await fetch('http://localhost:3001/financialRecords', {
            method: "POST", 
            body: JSON.stringify(record),
            headers: {
                'Content-Type': "application/json"
            }
        });

        try{
            if(response.ok){
                const newRecord = await response.json();
                setRecords((previousState) => [...previousState, newRecord]);
            }
        } catch(error){
            console.log("error adding record", error);
        }
    }

    const updateRecord = async (id: string, newRecord: FinancialRecord) => {
        // if(!user) return;
        const response = await fetch(`http://localhost:3001/financialRecords/${id}`, {
            method: "PUT", 
            body: JSON.stringify(newRecord),
            headers: {
                'Content-Type': "application/json"
            }
        });

        try{
            if(response.ok){
                const newRecord = await response.json();
                setRecords((previousState) => previousState.map((record) => {
                    if(record._id === id){
                        return newRecord;
                    }
                    else{
                        return record;
                    }
                }));
            }
        } catch(error){
            console.log("error adding record", error);
        }
    }

    const deleteRecord = async (id: string) => {
        const response = await fetch(`http://localhost:3001/financialRecords/${id}`, {
            method: "DELETE"
        });
    
        if (response.ok) {
            const deletedRecord = await response.json();
            setRecords((previousState) => previousState.filter((record) => record._id !== deletedRecord._id));
        }
    }


    return <FinancialRecordsContext.Provider value={{records, addRecord, updateRecord, deleteRecord}}> {children} </FinancialRecordsContext.Provider>
}

export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordsContextType | undefined>(FinancialRecordsContext);

    if(!context)
        throw new Error("useFinancialRecords must be used withing a FinacnialRecordsProvider");

    return context;
}