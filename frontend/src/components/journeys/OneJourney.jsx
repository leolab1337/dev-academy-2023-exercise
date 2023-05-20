import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {v4 as uuid} from "uuid";
import {changeStringDateToDate} from "../../utils/changeStringDateToDate";
import {getOneJourneyById} from "../../api/joyrneys";
import {RoutePaths} from "../router/routeConfig";

/**
 * OneJourney is a functional component that displays information about a single journey.
 * @return {JSX.Element} - A JSX element representing the UI for the OneJourney component.
 */
const OneJourney = () => {

    const navigate = useNavigate();
    const params = useParams();
    const journeyID = params.id;

    const [fetchError,setFetchError] = useState(null);
    let [journeyObject,setJourneyObject] = useState({});

    useEffect( ()=>{
        getOneJourneyById(journeyID).then(r=>{
            if(r.isSuccess === true){
                setJourneyObject(changeStringDateToDate(r.result[0]));
                setFetchError(null);
            }
            else{
                navigate(RoutePaths.NOT_FOUND);
            }
        }).catch(e => setFetchError(e));


    },[navigate,journeyID]);

    const goToStation = stationID => navigate(`/${RoutePaths.STATIONS}/${stationID}`);

    return (
        <>
            <div >
                <ul className=''>
                    {journeyObject && Object.entries(journeyObject).map(([key,val]) => (
                        <li key={uuid()}>

                            {key}: {val}
                            {key === 'Departure_station_id' || key === 'Return_station_id'

                                ?
                                <button onClick={()=>goToStation(val)} style={{marginLeft: '1rem',backgroundColor  : '#36d25a'}}>Take a look</button>
                                : ''
                            }
                        </li>
                    ))}
                </ul>
            </div>
            <br/> <b>{fetchError && fetchError.toString() + '; Possibly problems with backend connection'}</b>
        </>
    );
};

export default OneJourney;
