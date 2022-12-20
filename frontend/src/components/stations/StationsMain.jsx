import React, {useEffect, useState} from 'react';
import {deleteById, fetchAllData, postNewOne} from "../../api/api";
import StationList from "./StationList";
import {Collapse} from "react-bootstrap";
import AddNewStation from "./AddNewStation";


const StationsMain =  () => {

    const [stations,setStations] = useState();
    const [stationsColumns,setStationsColumns] = useState();
    const [fetchError,setFetchError] = useState(null);

    const[signal,sendSignal] = useState(false);

    /**
     *
     * @param id
     */
    const deleteStationById = (id) => {
        deleteById(`${process.env.REACT_APP_SERVER_URL}/stations/${id}`).then(r=>{
            if(r != null && r.isSuccess){
                alert('data was successfully deleted');
                sendSignal(prevState => !prevState);
            }
            else{
                alert('some problem with deleting data');
            }
            }
        )
    }

    /**
     *
     * @param reqObject{object}
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
               setStations(r.result);
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
                <StationList stations={stations} stationsColumns={stationsColumns} deleteStationById={deleteStationById} />
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
