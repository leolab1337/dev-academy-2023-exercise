import React, {useEffect, useState} from 'react';
import {OwnPagination} from "../utilComponents/OwnPagination/OwnPagination";
import Table from "../utilComponents/Table";
import {useNavigate} from "react-router";
import {deleteJourneyById, getAllJourneys} from "../../api/joyrneys";
import {RoutePaths} from "../router/routeConfig";

/**
 * JourneysMain is a functional component that displays a table of journeys data, with pagination.
 * @return {JSX.Element} - A JSX element representing the UI for the JourneysMain component.
 */
const JourneysMain = () => {

    const [journeys,setJourneys] = useState(null);
    const [journeysColumns,setJourneysColumns] = useState([]);

    const [fetchError,setFetchError] = useState(null);
    const [signal,sendSignal] = useState(false);
    const navigate = useNavigate();

    const openJourney = id => navigate(`/${RoutePaths.JOURNEYS}/${id}`);

    const deleteJourneyByIdLocal = id => {
        window.confirm('Are you sure?') && deleteJourneyById(id).then(
            result => result && result.isSuccess ? sendSignal(prevState => !prevState) : alert('some problem with deleting data'))
    }

    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect( ()=>{
        getAllJourneys(pageSize,pageNumber).then(r=>{
            if( r !== null){
                setJourneys(r.result);
                setJourneysColumns(Object.keys(r.result[0]));
                setTotalPages(Math.ceil(r.totalCount/pageSize));
            }
        }).catch(e => setFetchError(e));
    },[signal,pageSize,pageNumber]);


    return (
        <>
            <div className='mt-3'>
                <OwnPagination
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    totalPages={totalPages}
                    setPageNumber={setPageNumber}
                    setPageSize={setPageSize}
                />
            </div>

            {journeys && journeys.length !== 0 &&
            <div style={{transform: 'scale(1)'}}>
                <Table rows={journeys}
                       columns={journeysColumns}
                       openRow={openJourney}
                       deleteRow={deleteJourneyByIdLocal}
                />
            </div>
        }


            <b>{fetchError && fetchError.toString() + '; Possibly there are problems with backend connection'}</b>
        </>
    );
};

export default JourneysMain;
