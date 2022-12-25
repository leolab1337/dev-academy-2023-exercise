/**
 *
 * @param {number} pageSize - The number of results to be displayed on a single page
 * @param {number} pageNumber - The current page number
 * @param {number} totalPages - The total number of pages
 * @param {function} handlePrevPage - A function to handle the previous page button click event
 * @param {function} handleNextPage - A function to handle the next page button click event
 * @param {function} handlePageSizeChange - A function to handle the page size input change event
 *
 * @returns {JSX.Element} - A JSX element representing the pagination component
 */
export const OwnPagination = ({pageSize,pageNumber,totalPages,handlePrevPage,handleNextPage,handlePageSizeChange,error}) => {
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
                <input type="number" value={pageSize} onChange={handlePageSizeChange}  min="1" max="100"/>
            </div>
            <span style={{color: 'red'}}>{error && error}</span>
        </div>
    );
};

export default OwnPagination;
