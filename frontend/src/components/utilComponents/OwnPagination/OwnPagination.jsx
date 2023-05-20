import {useState} from "react";

/**
 *
 * @param {number} pageSize - The number of results to be displayed on a single page
 * @param {number} pageNumber - The current page number
 * @param {number} totalPages - The total number of pages
 * @param {function} setPageNumber - A Callback for setting page number
 * @param {function} setPageSize A Callback for setting page size
 * @returns {JSX.Element} - A JSX element representing the pagination component
 */
export const OwnPagination = ({pageSize,pageNumber,totalPages,setPageNumber,setPageSize}) => {

    const [validationError,setValidationError] = useState(null);

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

    return (
        <div>
            <div>
                <button onClick={handlePrevPage} disabled={pageNumber === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
                    Next
                </button>
            </div>
            <div>
                Page {pageNumber} of {totalPages}
            </div>
            <div>
                Results per page:{' '}

                <input id='numberInput' type="number" value={pageSize} onChange={handlePageSizeChange}  min="1" max="100"/>
                <label style={{fontSize: '0.8rem', marginLeft: '0.4rem', color: '#bd111f'}} htmlFor="numberInput">Values between(1-100)</label>
            </div>
            <span style={{color: 'red'}}>{validationError && validationError}</span>
        </div>
    );
};

export default OwnPagination;
