import predictTableCSS from "./PredictTable.module.css";

const Table = ({prediction}) => {

    return (
        <table className={predictTableCSS.container}>
            <thead>
                <tr>
                <th className={predictTableCSS.header}>Predicted Digit</th>
                
                </tr>
            </thead>
            <tbody>

            {[...Array(10)].map((_, index) => (
                <tr key={index}>
                    {prediction === index? (
                    <td className={predictTableCSS.selected}>{index}</td>
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