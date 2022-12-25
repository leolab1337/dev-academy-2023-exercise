import React, {useEffect, useState} from 'react';
import {deleteById, fetchAllData, postNewOne} from "../../api/api";
import StationList from "./StationList";
import {Collapse} from "react-bootstrap";
import AddNewStation from "./AddNewStation";


/**
 * StationsMain - a functional component that displays a list of stations, allows the user to add a new station, and
 * allows the user to delete a station from the list. The component uses the `deleteStationById` and `postNewStation`
 * functions to delete and add stations, respectively. It also uses the `signal` state and the `sendSignal` function to
 * trigger a re-fetch of the list of stations from the server whenever a station is added or deleted.
 * @returns {JSX.Element} - A JSX component that displays a list of stations, a form for adding a new station, and buttons for deleting and adding stations.
 */
 const StationsMain =  () => {

    const [stations,setStations] = useState([]);
    const [stationsColumns,setStationsColumns] = useState();
    const [fetchError,setFetchError] = useState(null);
    const[signal,sendSignal] = useState(false);


    /**
     * deleteStationById - a function that deletes a station from the server by its ID.
     *
     * @param {string} id - The ID of the station to be deleted.
     *
     * @returns {void} - This function does not return a value.
     */
    const deleteStationById = (id) => {
        deleteById(`${process.env.REACT_APP_SERVER_URL}/stations/${id}`).then(r=>{
            if(r != null && r.isSuccess){
                // alert('data was successfully deleted');
                sendSignal(prevState => !prevState);
            }
            else{
                alert('some problem with deleting data');
            }
            }
        )
    }

    /**
     * postNewStation - a function that posts a new station to the server.
     * @param {Object} reqObject - An object that contains the new station data to be posted to the server.
     * @returns {void} - This function does not return a value.
     */
    const postNewStation = (reqObject) => {
        postNewOne(`${process.env.REACT_APP_SERVER_URL}/stations`,reqObject).then(r=>{
                if(r != null && r.isSuccess){
                    alert('data was successfully added');
                    sendSignal(prevState => !prevState);
                }
                else if(r != null){
                    alert(r.message);
                }
                else{
                    alert('some problem with adding data');
                }
            }
        )
    }



    useEffect( ()=>{
       fetchAllData(`${process.env.REACT_APP_SERVER_URL}/stations`).then(r=>{
           if( r !== null){
               setStations(r.result)
               setStationsColumns(Object.keys(r.result[0]));
           }
       }).catch(e => setFetchError(e));
    },[signal]);


    const [openList, setOpenList] = useState(true);
    const [openPostNew, setOpenPostNew] = useState(false);

    // open/close checker is an one is open another one is closed
    useEffect(()=>{openList && setOpenPostNew(false)},[openList]);
    useEffect(()=>{openPostNew && setOpenList(false)},[openPostNew]);



    return (
        <>
            <br/>
            {/*todo one general component for buttons for no duplicating*/}
            <div className="buttonGroups d-flex justify-content-start gap-2">
                <button
                    onClick={() => setOpenList(!openList)}
                    aria-controls="stations list"
                    aria-expanded={openList}
                >
                    {openList ? 'Click to close stations list' : 'Click to open stations list'}
                </button>

                <button
                    onClick={() => setOpenPostNew(!openPostNew)}
                    aria-controls="stations list"
                    aria-expanded={openPostNew}
                >
                    {openPostNew ? 'Click to close new post form' : 'Click to open new post form'}
                </button>
            </div>

            <Collapse in={openList}>
                <div>
                <StationList stations={stations} stationsColumns={stationsColumns} deleteStationById={deleteStationById}/>
                </div>
            </Collapse>

            <Collapse in={openPostNew}>
                <div>
                    <AddNewStation postNewStation={postNewStation}/>
                </div>
            </Collapse>


            <b>{fetchError && fetchError.toString() + '; Possibly problems with backend connection'}</b>
        </>
    );
};

export default StationsMain;
