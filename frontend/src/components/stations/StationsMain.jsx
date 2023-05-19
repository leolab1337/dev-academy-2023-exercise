import React, {useEffect, useState} from 'react';
import {deleteById, fetchAllData, postNewOne} from "../../api/api";
import StationList from "./StationList";
import {Collapse} from "react-bootstrap";
import AddNewStation from "./AddNewStation";
import {OwnPagination} from "../utilComponents/Pagination";


/**
 * StationsMain - a functional component that displays a list of stations, allows the user to add a new station, and
 * allows the user to delete a station from the list. The component uses the `deleteStationById` and `postNewStation`
 * functions to delete and add stations, respectively. It also uses the `signal` state and the `sendSignal` function to
 * trigger a re-fetch of the list of stations from the server whenever a station is added or deleted.
 * @returns {JSX.Element} - A JSX component that displays a list of stations, a form for adding a new station, and buttons for deleting and adding stations.
 *
 * The component also includes pagination functionality, with the `pageSize` and `pageNumber` state variables controlling
 * the number of items displayed per page and the current page, respectively. The `handlePageSizeChange`, `handlePrevPage`,
 * and `handleNextPage` functions allow the user to change the page size and navigate between pages. The `totalPages`
 * state variable stores the total number of pages for the list of stations.
 */
 const StationsMain =  () => {

    const [stations,setStations] = useState(null);
    const [stationsColumns,setStationsColumns] = useState();

    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [validationError,setValidationError] = useState(null);

    const [fetchError,setFetchError] = useState(null);
    const[signal,sendSignal] = useState(false);


    /**
     * deleteStationById - a function that deletes a station from the server by its ID.
     * @param {string} id - The ID of the station to be deleted.
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

    /**Pagination logic*/
    const handlePageSizeChange = ev => {
        if(ev.target.value < 1){
            setValidationError('Value cannot be less than 1');
        }
        else if(ev.target.value >100){
            setValidationError('Value cannot be greater than 100');
        }
        else{
            setValidationError(null);
            setPageSize(ev.target.value);
        }
    };
    const handlePrevPage = _ => setPageNumber(pageNumber - 1);
    const handleNextPage = _ => setPageNumber(pageNumber + 1);


    useEffect( ()=>{
       fetchAllData(`${process.env.REACT_APP_SERVER_URL}/stations?pageSize=${pageSize}&pageNumber=${pageNumber}`).then(r=>{
           if( r !== null){
               setStations(r.result);
               setStationsColumns(Object.keys(r.result[0]));
               setTotalPages(Math.ceil(r.totalCount/pageSize));
           }
       }).catch(e => setFetchError(e));
    },[signal,pageSize,pageNumber]);



    // open/close checker is  a one is open an another should be closed
    const [openList, setOpenList] = useState(true);
    const [openPostNew, setOpenPostNew] = useState(false);
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
                    <div className='mt-3'>
                        {

                            <OwnPagination
                                pageSize={pageSize}
                                pageNumber={pageNumber}
                                totalPages={totalPages}
                                handlePrevPage={handlePrevPage}
                                handleNextPage={handleNextPage}
                                handlePageSizeChange={handlePageSizeChange}
                                error={validationError}
                            />
                        }
                    </div>

                    {
                        stations && <StationList stations={stations} stationsColumns={stationsColumns} deleteStationById={deleteStationById}/>}
                </div>
            </Collapse>

            <Collapse in={openPostNew}>
                <div>
                    <AddNewStation postNewStation={postNewStation}/>
                </div>
            </Collapse>


            <b>{fetchError && fetchError.toString() + '; Possibly there are problems with backend connection'}</b>
        </>
    );
};

export default StationsMain;
