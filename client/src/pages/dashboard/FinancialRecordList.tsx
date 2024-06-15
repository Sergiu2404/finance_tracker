import { useMemo, useState } from "react";
import { FinancialRecord, useFinancialRecords } from "../../contexts/FinancialRecordContext";
import { useTable, Column, CellProps } from 'react-table';

interface EditableCellProps extends CellProps<FinancialRecord> {
    updateRecord: (rowIndex: number, columnId: string, value: any) => void;
    editable: boolean; // Add editable property to interface
}

const EditableCell: React.FC<EditableCellProps> = ({ value: initialValue, row, column, updateRecord, editable }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
        setIsEditing(false);
        updateRecord(row.index, column.id, value);
    }

    return (
        <div onClick={() => editable && setIsEditing(true)} style={{cursor: editable ? "pointer" : "default"}}>
            {isEditing ? (
                <input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    autoFocus
                    onBlur={onBlur}
                    style={{ width: "100%" }}
                />
            ) : typeof value === "string" ? (
                value
            ) : (
                value.toString()
            )}
        </div>
    );
}


export const FinancialRecordList = () => {
    const { records, updateRecord, deleteRecord } = useFinancialRecords();
    const updateCellRecord = (rowIndex: number, columnId: string, value: any) => {
        const id = records[rowIndex]?._id;
        updateRecord(id ?? "", {...records[rowIndex], [columnId]: value});
        // DID IT FOR THIS ERROR: Types of parameters 'id' and 'rowIndex' are incompatible.
        //type 'number' is not assignable to type 'string'.
    }

    const columns: Array<Column<FinancialRecord>> = useMemo(
        () => [
            {
                Header: "Description",
                accessor: "description",
                Cell: (props) => <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />, // Pass editable prop
            },
            {
                Header: "Amount",
                accessor: "amount",
                Cell: (props) => <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />, // Pass editable prop
            },
            {
                Header: "Category",
                accessor: "category",
                Cell: (props) => <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />, // Pass editable prop
            },
            {
                Header: "PaymentMethod",
                accessor: "paymentMethod",
                Cell: (props) => <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />, // Pass editable prop
            },
            {
                Header: "Date",
                accessor: "date",
                Cell: (props) => <EditableCell {...props} updateRecord={updateCellRecord} editable={false} />, // Pass editable prop
            },
            {
                Header: "Delete",
                id: "delete",
                Cell: ({ row }) => <button onClick={() => deleteRecord(row.original._id ?? "")} className="button">delete</button>,
            }
        ],
        [records] // Ensure to recreate the array whenever changes in records occur
    );
    

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data: records });

    return (
        <div className="table-container">
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}> {column.render("Header")} </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
