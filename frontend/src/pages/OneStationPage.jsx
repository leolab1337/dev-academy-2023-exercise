import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {Container} from "react-bootstrap";
import {fetchOneById} from "../api/api";
import {v4 as uuid} from "uuid";
import GoBackButton from "../components/GoBackButton";

const OneStationPage = () => {


    const navigate = useNavigate();

    const params = useParams();
    const stationID = params.id;

    const [fetchError,setFetchError] = useState(null);
    const [stationObject,setStationObject] = useState(null);


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

    return (


        <Container>

            <GoBackButton/>
            <br/>
            <br/>

            <ul>
            {stationObject && Object.entries(stationObject).map(([key,val]) => (
                <li key={uuid()}>{key}: {val}</li>
            ))}
            </ul>

           <b>{fetchError && fetchError.toString() + '; Possibly problems with backend connection'}</b>
        </Container>
    );
};

export default OneStationPage;
