import { v4 as uuid } from 'uuid';
import styles from './Stations.module.css'
import {useLocation, useNavigate} from "react-router";
import {SortByTitle} from "../../utils/SortByTitle";
import {useCallback, useEffect, useState} from "react";


/**
 *
 * @param stations
 * @param stationsColumns
 * @param deleteStationById{Function}
 * @returns {JSX.Element}
 * @constructor
 */
const StationList = ({stations=[],stationsColumns,deleteStationById}) => {


    const navigate = useNavigate();
    const { pathname } = useLocation();
    const onClick = id => navigate(`${pathname}/${id}`);

    const [stationsLocal, setStationsLocal] = useState(stations);
    const [currentTitle,setCurrentTitle] = useState('FID');
    const [isMinToMax,setIsMinToMax] = useState(true);

    const doSort = (newTitle)=>{

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
    }

    useEffect(()=>{
        if(stationsLocal){
            doSort(currentTitle);
        }
        setStationsLocal(stations);
    },[stations,stationsColumns])


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







