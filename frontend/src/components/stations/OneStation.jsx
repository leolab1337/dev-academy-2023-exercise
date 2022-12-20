import React, {useEffect, useState} from 'react';
import {v4 as uuid} from "uuid";
import {useNavigate, useParams} from "react-router";
import {fetchOneById} from "../../api/api";
import Map from "../map/Map";


const OneStation = () => {

    const navigate = useNavigate();
    const params = useParams();
    const stationID = params.id;

    const [fetchError,setFetchError] = useState(null);
    let [stationObject,setStationObject] = useState({});


    useEffect( ()=>{
        fetchOneById(`${process.env.REACT_APP_SERVER_URL}/stations/${stationID}`).then(r=>{
            if(r.isSuccess === true){
                setStationObject(r.result[0]);
            }
            else{
                navigate('/404');
            }
        }).catch(e => setFetchError(e))
    },[]);

    useEffect( ()=>{
        console.log(stationObject.x)
        console.log(stationObject.y)
    },[stationObject]);

    return (
        <>
            <div className='d-flex justify-content-start gap-3'>
            <ul>
                {stationObject && Object.entries(stationObject).map(([key,val]) => (
                    <li key={uuid()}>{key}: {val}</li>
                ))}
            </ul>

                {
                    Object.keys(stationObject).length !== 0 && <Map x={stationObject.x} y={stationObject.y}/>
                }
            </div>

           <br/> <b>{fetchError && fetchError.toString() + '; Possibly problems with backend connection'}</b>
        </>
    );
};

export default OneStation;



