import React, {useEffect, useState} from 'react';
import {v4 as uuid} from "uuid";
import {useNavigate, useParams} from "react-router";
import {fetchOneById} from "../../api/api";
import Map from "../map/Map";

/**
 * A component that displays the details of a single station, including its location on a map.
 * The component fetches the station data from the server using the station's ID, which is passed as a route parameter.
 * @return {JSX.Element} The `div` element with the station data and map.
 */
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
    },[navigate,stationID]);

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



