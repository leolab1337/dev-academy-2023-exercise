const journeysCrudService = require("../services/journeysCrud");


/**
 * Retrieves a page of rows from the journeys table.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function in the route.
 * @return {Promise<void>} - A promise that resolves when the function has completed.
 *                           The response object will be updated with the result of the query.
 */
getAllJourneys = async (req, res, next) => {

    const pageSize = req.query.pageSize || 10;
    const pageNumber = req.query.pageNumber || 1;

    try{

        const rowsCount = await journeysCrudService.getCountOfRows();

        const resp = await journeysCrudService.getAllJourneys(Number(pageSize),Number(pageNumber));
        if(resp && rowsCount){
            res.statusCode = 200;
            res.result = resp;
            res.totalCount = rowsCount[0]['count'];
            // console.log(res.result);
        }
        else{
            res.statusCode = 404;
        }
    } catch (e){
        console.log("No connection to the DB or problems with query");
        console.log(e);
        res.statusCode = 500;
    }
    next();
}

/**
 * Retrieves a row from the journeys table by its ID.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function in the route.
 * @return {Promise<void>} - A promise that resolves when the function has completed.
 *                           The response object will be updated with the result of the query.
 *
 * @param {string} req.params.id - The ID of the row to retrieve.
 */
getJourneyById = async (req, res, next) => {

    try{
        if(!isNaN(req.params.id)){
            const resp = await journeysCrudService.getJourneyById(req.params.id);
            if(resp !== null ){
                res.statusCode= 200;
                res.result = resp;
            }
            else{
                res.statusCode = 404;
            }

        }
        else{
            res.statusCode = 400;
        }


    } catch (e){
        console.log("No connection to the DB or problems with query");
        console.log(e);
        res.statusCode = 500;
    }
    next();
}


/**
 * Deletes a row from the journeys table by its ID.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function in the route.
 * @return {Promise<void>} - A promise that resolves when the function has completed.
 *                           The response object will be updated with the result of the query.
 *
 */
deleteJourneyById = async (req, res, next) => {
    try{
        if(!isNaN(req.params.id)){

            const resp1 = await journeysCrudService.getJourneyById(req.params.id);

            if(resp1 !== null){
                const resp = await journeysCrudService.deleteJourneyById(req.params.id);
                if(resp){
                    res.statusCode = 200;
                    res.result = resp;
                }
            }
            else{
                res.statusCode = 404;
            }
        }
        else{
            res.statusCode = 400;
        }

    } catch (e){
        console.log("No connection to the DB or problems with query");
        console.log(e);
        res.statusCode = 500;
    }
    next();
}



module.exports = {
    getJourneyById,
    getAllJourneys,
    deleteJourneyById
}
