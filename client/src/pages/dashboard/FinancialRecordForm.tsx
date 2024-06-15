import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/FinancialRecordContext";

export const FinancialRecordForm = () => {

    const {user} = useUser();

    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    // const {} = useContext
    const { addRecord } = useFinancialRecords();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); //for not refreshing the page on submit form

        const newRecord = {
            userId: user?.id ?? "",
            date: new Date(), //current date
            description: description,
            amount: parseFloat(amount),
            category: category,
            paymentMethod: paymentMethod
        }

        addRecord(newRecord);
        console.log(newRecord);

        setDescription("");
        setAmount("");
        setCategory("");
        setPaymentMethod("");
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>Description</label>
                    <input type="text" required className="input" value={description} onChange={(event) => { setDescription(event.target.value); }}/>
                </div>

                <div className="form-field">
                    <label>Amount</label>
                    <input type="text" required className="input" value={amount} onChange={(event) => { setAmount(event.target.value); }}/>
                </div>

                <div className="form-field">
                    <label>Category</label>
                    <select required className="input" value={category} onChange={(event) => { setCategory(event.target.value); }}>
                        <option value=""> select a category </option>
                        <option value="food"> food </option>
                        <option value="rent"> rent </option>
                        <option value="salary"> salary </option>
                        <option value="utilities"> utilities </option>
                        <option value="entertainment"> entertainment </option>
                        <option value="other"> other </option>
                    </select>
                </div>
                <div className="form-field">
                    <label> Payment method </label>
                    <select required className="input" value={paymentMethod} onChange={(event) => { setPaymentMethod(event.target.value); }}>
                        <option value=""> select a payment method </option>
                        <option value="credit card"> credit card </option>
                        <option value="cash"> cash </option>
                        <option value="bank transfer"> bank transfer </option>
                    </select>
                </div>

                {/* type submit bc whenever someone clicks the button, onSubmit form is called */}
                <button type='submit' className="button">
                    Add record
                </button>
            </form>
        </div>
    );
}