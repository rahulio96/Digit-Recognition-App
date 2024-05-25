import "./PredictTable.css";

const Table = ({prediction}) => {

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
                    {prediction === index? (
                    <td className="selected">{index}</td>
                    ):
                    <td>{index}</td>
                    }
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;