import { v4 as uuid } from 'uuid';
import styles from './Stations.module.css'
import {useLocation, useNavigate} from "react-router";
import {useCallback, useEffect, useState} from "react";

/**
 * StationList - a functional component that displays a list of stations with the ability to sort by column and delete a station.
 * @param {Array} stations - An array of objects that represents the stations to be displayed in the list.
 * @param {Array} stationsColumns - An array of strings that represent the column titles for the stations list.
 * @param {function} deleteStationById - A function that takes in an ID and deletes a station from the list by that ID.
 * @returns {JSX.Element} - A JSX element that represents the rendered station list.
 */
const StationList = ({stations=[],stationsColumns,deleteStationById}) => {


    const navigate = useNavigate();
    const { pathname } = useLocation();
    const onClick = id => navigate(`${pathname}/${id}`);

    const [stationsLocal, setStationsLocal] = useState(stations);
    const [currentTitle,setCurrentTitle] = useState('FID');
    const [isMinToMax,setIsMinToMax] = useState(true);

    const doSort = useCallback((newTitle) => {

        let sortedStations = [];

        if(newTitle === currentTitle) {
            setIsMinToMax(prevState => !prevState);
        }
        else{
            setIsMinToMax(true);
        }

        if(isMinToMax){
            sortedStations = [...stationsLocal].sort( (a,b)=>typeof(a[newTitle]) === "string" ?
                a[newTitle].localeCompare(b[newTitle])
                : a[newTitle] - b[newTitle]
            );
        }

        if(!isMinToMax){
            sortedStations = [...stationsLocal].sort( (a,b)=>typeof(b[newTitle]) === "string" ?
                b[newTitle].localeCompare(a[newTitle])
                : b[newTitle] - a[newTitle]
            );
        }
        setCurrentTitle(newTitle);
        setStationsLocal(sortedStations);
    }, [currentTitle, isMinToMax, stationsLocal]);




    useEffect(()=>{
        if(stationsLocal){
            doSort(currentTitle);
        }
    },[stations,stationsColumns]);



    return (
        <>
            <br/>
        <div>
            <div className='d-flex justify-content-between'>
            {stationsColumns?.map( (sc)=>(
                <span  style={{cursor: 'pointer'}} onClick={()=>doSort(sc)} key={uuid()}>{sc}</span>
                )
            )}
            </div>

            <div>
                {stationsLocal?.map(s=>(
                    <div key={uuid()}>
                        <div className={styles.listItemRelative}>
                            <span className={styles.deleteListItem} onClick={()=>deleteStationById(s.ID)}>X</span>
                            <div key={uuid()} className={'d-flex justify-content-between mt-2 ' + styles.listItem}
                                 onClick={()=> onClick(s.ID)}
                    >
                        {
                            Object.entries(s).map(([key,val]) => (
                                    <span key={uuid()}>{val}</span>
                                ))
                        }
                            </div>

                        </div>

                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default StationList;


/**
 *
 * @param stations
 * @param stationsColumns
 * @param deleteStationById{Function}
 * @returns {JSX.Element}
 * @constructor
 */






