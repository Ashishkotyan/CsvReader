import React from "react";
import Papa from "papaparse"
import { useState } from "react";
import './App.css'




let vaal = 1;


function App() {

    const [data, setData] = useState([]);
    const [colData, setcolData] = useState([]);
    const [Values, setValues] = useState([]);
    const [addBTN, setBTN] = useState();
    const [Table, setTable] = useState();


    const Handlefile = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,

            complete: async function (result) {


                const columnArray = [];
                const valuesArray = [];


                result.data.map((D) => {
                    columnArray.push(Object.keys(D));
                    valuesArray.push(Object.values(D))
                });

                setData(result.data);
                if (data != null) {
                    setBTN(
                        <button className="finish">Finish</button>
                    )
                    setTable(<h1>Table</h1>)
                }
                setcolData(columnArray[0])
                setValues(valuesArray)
            }
        })
    }




    return (

        <>
            <header className="Header">
                <h1 className="CSV">CSV READER</h1>
                <input
                    type="file"
                    name="file"
                    accept="csv"
                    onChange={Handlefile}

                ></input>
                {addBTN}
                {Table}
            </header>

            <table className="TableMain">
                <thead className="Thead1">
                    <tr>
                        {colData.map((col, i) => (
                            <th>
                                <select className="Select_opt">

                                    <option>{col}</option>
                                    {colData.map((dat) => {
                                        if (dat !== col) {
                                            return <option>{dat}</option>
                                        }
                                        else {
                                            return false
                                        }
                                    })}
                                </select></th>
                        ))}
                    </tr>
                </thead>

                <tbody className="Tbody1">

                    {Values.map((val, iT) => (
                        <> <tr key={iT}>
                            {val.map((valu, i) => (
                                <td key={i}>{`${valu.toUpperCase()}`}</td>
                            ))}
                        </tr></>
                    ))}

                </tbody>
           
            </table>



        </>
    )
}
export default App
