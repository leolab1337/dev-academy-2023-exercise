import React, {useEffect, useState} from 'react';
import {fetchAllData} from "../../api/api";



const StationsMain =  () => {

    const [stations,setStations] = useState([]);
    const [stationsColumns,setStationsColumns] = useState([]);

    useEffect( ()=>{
       fetchAllData(`${process.env.REACT_APP_SERVER_URL}stations`).then(r=>{
           setStations(r.result);
           setStationsColumns(Object.keys(r.result[0]))
           console.log(Object.keys(r.result[0]));
       })
    },[])

    return (
        <div>

            <div className='d-flex justify-content-between'>
            {stationsColumns.map( (sc)=>(
                <span>{sc}</span>
                )

            )}
            </div>
            {stations.map(s=>(
                <div className='d-flex justify-content-between'>
                    <span>{s.FID}</span>
                    <span>{s.ID}</span>
                    <span>{s.Nimi}</span>
                    <span>{s.Namn}</span>
                    <span>{s.Name}</span>
                    <span>{s.Nimi}</span>
                    <span>{s.Operaattor}</span>
                    <span>{s.Osoite}</span>
                    <span>{s.Stad}</span>
                    <span>{s.x}</span>
                    <span>{s.y}</span>
                </div>
            ))}
        </div>
    );
};

export default StationsMain;
