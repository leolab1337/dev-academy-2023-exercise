import { v4 as uuid } from 'uuid';
import styles from './Stations.module.css'
import {useLocation, useNavigate} from "react-router";


/**
 *
 * @param stations
 * @param stationsColumns
 * @param deleteStationById{Function}
 * @returns {JSX.Element}
 * @constructor
 */
const StationList = ({stations,stationsColumns,deleteStationById}) => {


    const navigate = useNavigate();
    const { pathname } = useLocation();
    const onClick = id => navigate(`${pathname}/${id}`)


    return (
        <>
            <br/>
        <div>
            <div className='d-flex justify-content-between'>
            {stationsColumns?.map( (sc)=>(
                <span key={uuid()}>{sc}</span>
                )
            )}
            </div>

            <div>
                {stations?.map(s=>(
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







