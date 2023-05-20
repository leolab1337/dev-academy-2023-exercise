import { v4 as uuid } from 'uuid';
import styles from './Stations.module.css'
import {useNavigate} from "react-router";
import useObjectArraySort from "../../hooks/useObjectArraySort";
import {RoutePaths} from "../router/routeConfig";

/**
 * StationList - a functional component that displays a list of stations with the ability to sort by column and delete a station.
 * @param {Array} stations - An array of objects that represents the stations to be displayed in the list.
 * @param {Array} stationsColumns - An array of strings that represent the column titles for the stations list.
 * @param {function} deleteStationById - A function that takes in an ID and deletes a station from the list by that ID.
 * @returns {JSX.Element} - A JSX element that represents the rendered station list.
 */
const StationList = ({stations=[],stationsColumns,deleteStationById}) => {


    const navigate = useNavigate();
    const onClick = id => navigate(`/${RoutePaths.STATIONS}/${id}`);

    const [stationsLocal, handleObjectArraySort] = useObjectArraySort(stations, stationsColumns[0]);

    return (
        <>
            <br/>
        <div>
            <div className='d-flex justify-content-between'>
            {stationsColumns?.map( (sc)=>(
                <span  style={{cursor: 'pointer'}} onClick={()=>handleObjectArraySort(sc)} key={uuid()}>{sc}</span>
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






