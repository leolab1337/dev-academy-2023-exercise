import React, {useMemo} from 'react';
import { v4 as uuid } from 'uuid';
import useObjectArraySort from "../../hooks/useObjectArraySort";
import {changeStringDateToDate} from "../../utils/changeStringDateToDate";


/**
 * Table component that displays a table with rows of data and allows sorting and manipulation of rows.
 * @param {Object[]} rows - An array of objects representing the rows of data to display in the table.
 * @param {string[]} columns - An array of strings representing the names of the columns to display in the table.
 * @param {function} openRow - A function that takes the id of a row and opens the row.
 * @param {function} deleteRow - A function that takes the id of a row and deletes the row.
 */
const Table = ({rows=[],columns=[],openRow,deleteRow}) => {

    const validatedRows = useMemo(() => {
        return rows.map(r => {
            return changeStringDateToDate(r);
        });
    }, [rows]);


    const [localRows, handleObjectArraySort] = useObjectArraySort(validatedRows, columns[0]);

    return (
        <>
        <table>
            <thead>
            <tr>
                {columns && columns.map(c=>(
                    <th style={{cursor:'pointer'}} onClick={()=>handleObjectArraySort(c)} align="center" key={uuid()}>{c}</th>
                ))}
            </tr>
            </thead>
            {
                localRows && localRows.map(r=>(
                    <tbody key={uuid()}>
                    <tr >
                        {
                            Object.entries(r).map(([key,val])=>(
                                    key.toLowerCase() === 'id'
                                        ?
                                        <th key={uuid()}scope="row" align="center">{val}</th>
                                        :
                                        <td key={uuid()} align="center">{val}</td>
                            ))
                        }
                        <td className='d-flex gap-2'>
                            <button onClick={()=>openRow(r.id)} style={{backgroundColor: '#36d25a'}}>Open</button>
                            <button onClick={()=>deleteRow(r.id)} style={{backgroundColor: '#ce3434'}}>Delete</button>
                        </td>
                    </tr>
                    </tbody>
                ))
            }
        </table>
        </>
    );
};

export default Table;
