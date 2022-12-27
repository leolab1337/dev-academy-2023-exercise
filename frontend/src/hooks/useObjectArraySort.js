import { useState, useEffect } from 'react';
import {sortMaxToMin, sortMinToMax} from "../utils/sortObjectArraysByKey";
import {arraysEqual} from "../utils/arraysEqual";

/**
 * Custom hook for sorting an array of objects by a specified key
 *
 * @param {Array} initialArray - The array of objects to be sorted
 * @param {string} initialKey - The key to sort the array by
 * @returns {Array} An array containing the sorted array and a function for sorting the array by a new key
 */
const useObjectArraySort = (initialArray, initialKey) => {
    // State variables for the array and the current sort key
    const [array, setArray] = useState(sortMinToMax(initialArray,initialKey));
    const [oldKey, setOldKey] = useState(initialKey);

    // State variable for the sort direction (ascending or descending)
    const [isMinToMax,setIsMinToMax] = useState(true);

    /**
     * Helper function for sorting the array
     *
     * @param {string} newKey - The new key to sort the array by
     * @param {string} oldKey - The old sort key
     * @param {Array} oldArray - The old array
     * @returns {Array} The sorted array
     */
    const doSort = (newKey,oldKey,oldArray) => {
        let sortedArray = [];

        // Sort the old array in both ascending and descending order
        const sortedMinToMaxOld = sortMinToMax(oldArray,oldKey);
        const sortedMaxToMinOld = sortMaxToMin(oldArray,oldKey);

        // Sort the new array in both ascending and descending order
        const sortedMinToMaxNew = sortMinToMax(oldArray,newKey);
        const sortedMaxToMinNew = sortMaxToMin(oldArray,newKey);

        // Check if the sort key has changed
        if(newKey) {
            // Check if the sort key is the same as the old key
            if (newKey === oldKey) {
                // Check if the old array was sorted in descending order
                if (arraysEqual(oldArray, sortedMaxToMinOld)) {
                    // If so, sort in ascending order
                    sortedArray = sortedMinToMaxOld;
                    setIsMinToMax(true);
                }
                // Check if the old array was sorted in ascending order
                else if (arraysEqual(oldArray, sortedMinToMaxOld)) {
                    // If so, sort in descending order
                    sortedArray = sortedMaxToMinOld;
                    setIsMinToMax(false);
                }
            }
            // If the sort key has changed, check if the old array was already sorted by the new key
            else {
                // Check if the old array was sorted in ascending order by the new key
                if(arraysEqual(sortedMinToMaxNew,sortedMinToMaxOld)){
                    // If so, toggle the sort direction
                    if(isMinToMax){
                        sortedArray = sortedMaxToMinNew;
                        setIsMinToMax(false);
                    }
                    // If the old array was sorted in descending order by the new key, toggle the sort direction
                    else if(!isMinToMax){
                        sortedArray = sortedMinToMaxNew;
                        setIsMinToMax(true);
                    }
                }
                // Check if the old array was sorted in descending order by the new key
                else if(arraysEqual(sortedMaxToMinNew,sortedMaxToMinOld)){
                    // If so, set the sort direction to ascending
                    sortedArray = sortedMinToMaxNew
                    setIsMinToMax(true);
                }
                // If the old array was not sorted by the new key, default to descending order
                else{
                    sortedArray = sortedMaxToMinNew;
                    setIsMinToMax(false);
                }
            }
        }
        // If no sort key is provided, default to ascending order
        else{
            sortedArray = sortedMinToMaxOld;
            setIsMinToMax(true);
        }
        return sortedArray;
    };

    /**
     * Function for sorting the array by a new key
     *
     * @param {string} newKey - The new key to sort the array by
     */
    const handleObjectArraySort = (newKey) => {
        // Sort the array using the helper function
        const sortedArray = doSort(newKey,oldKey,array);
        // Update the array state with the sorted array
        setArray(sortedArray);
        // Update the old key state with the new key
        setOldKey(newKey);
    };

    // Use effect to sort the initial array when it or the sort key changes
    useEffect(() => {
        setArray(sortMinToMax(initialArray,initialKey));
    }, [initialArray,initialKey]);

    // Return the sorted array and the sort function
    return [array, handleObjectArraySort];
};

export default useObjectArraySort;

