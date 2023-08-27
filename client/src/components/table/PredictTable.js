//import { useState } from "react";
import "./PredictTable.css";

const Table = () => {
    //const [tableData, setTableData] = useState(Array(10).fill(""));

    return (

        <table className="predict-box">
            <thead>
                <tr>
                <th className="header">Predicted Digit</th>
                
                </tr>
            </thead>
            <tbody>

            {[...Array(10)].map((_, index) => (
                <tr key={index}>
                    <td>{index}</td>
                    
                </tr>
            ))}
            </tbody>
        </table>
        
        
    );
};

export default Table;