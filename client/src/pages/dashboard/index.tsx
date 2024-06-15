import { useUser } from '@clerk/clerk-react';
import { FinancialRecordForm } from './FinancialRecordForm';
import { FinancialRecordList } from './FinancialRecordList';
import { useFinancialRecords } from '../../contexts/FinancialRecordContext';
import { useMemo } from 'react';


export const Dashboard = () => {

    const { user } = useUser();
    const { records } = useFinancialRecords();

    const totalMonthly = useMemo(() => {
        let totalAmount = 0;
        records.forEach((record) => {
            totalAmount += record.amount;
        });

        return totalAmount;
    }, [records]);

    return (
        <div className="dashboard-container">
            <h1> Welcome { user?.username }. Here are your finances </h1>
            <FinancialRecordForm />
            <div> Total monthly: {totalMonthly} lei</div>
            <FinancialRecordList />
        </div>
    );
}