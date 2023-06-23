//import { useState } from "react";
import "./PredictTable.css";

const Table = () => {
    //const [tableData, setTableData] = useState(Array(10).fill(""));

    return (

        <table className="predict-box">
            <thead>
                <tr>
                <th className="header">Digit</th>
                <th className="header">Probability</th>
                </tr>
            </thead>
            <tbody>

            {[...Array(10)].map((_, index) => (
                <tr key={index}>
                    <td>{index}</td>
                    <td>0%</td>
                </tr>
            ))}
            </tbody>
        </table>
        
        
    );
};

export default Table;