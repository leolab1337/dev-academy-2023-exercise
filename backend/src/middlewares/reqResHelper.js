/**
 * The function sends default response for the GET request
 * @param req {object} request object
 * @param res {object} response object
 */
exports.handleGetResp = (req, res) => {

    if(res.statusCode === 400){
        res.json({
            isSuccess: false,
            message: "Bad Request,try to put a Number Value as the index",
            code: res.statusCode
        });
    }

    if(res.statusCode === 404){
        res.json({
            isSuccess: false,
            message: "No data found",
            code: res.statusCode
        });
    }

    if(res.statusCode === 200){
        res.json({
            isSuccess: true,
            message: "Data has been found",
            totalCount:res.totalCount,
            result: res.result,
            code: res.statusCode
        });
    }

    if(res.statusCode === 500){
        res.json({
            isSuccess: true,
            message: "Internal server error",
            code: res.statusCode
        });
    }
    res.end();
}

/**
 * The function sends default response for the POST request
 * @param req {object} request object
 * @param res {object} response object
 */
exports.handlePostResp = (req, res) => {

    if(res.statusCode === 200){
        res.json({
            isSuccess: true,
            message: "Data has been Posted",
            code: res.statusCode,
            added: res.result,
        });
    }

    else if(res.statusCode === 400){
       let message = res.statusMessage ? res.statusMessage : 'Bad Request,try to put a valid JSON'
        res.json({
            isSuccess: false,
            message: message,
            code: res.statusCode
        });
    }

    else if(res.statusCode === 404){
        res.json({
            isSuccess: false,
            message: "No data found",
            code: res.statusCode
        });
    }

    else if(res.statusCode === 500){
        res.json({
            isSuccess: true,
            message: "Internal server error",
            code: res.statusCode
        });
    }


    else{
        res.json({
            isSuccess: false,
            message: "Internal server error",
            code: 500
        });
    }

    res.end();
}

/**
 * The function sends default response for the PUT request
 * @param req {object} request object
 * @param res {object} response object
 */
exports.handlePutResp = (req, res) => {

    if(res.statusCode === 200){
        res.json({
            isSuccess: true,
            message: "Data has been updated",
            code: res.statusCode,
            result: res.result,
        });
    }

    if(res.statusCode === 400){
        res.json({
            isSuccess: false,
            message: "Bad Request,try to put a valid JSON",
            code: res.statusCode
        });
    }

    if(res.statusCode === 404){
        res.json({
            isSuccess: false,
            message: "No data found",
            code: res.statusCode
        });
    }

    if(res.statusCode === 500){
        res.json({
            isSuccess: true,
            message: "Internal server error",
            code: res.statusCode
        });
    }

    else{
        res.json({
            isSuccess: false,
            message: "Problems with updating data"
        });
    }

    res.end();
}

/**
 * The function sends default response for the DELETE request
 * @param req {object} request object
 * @param res {object} response object
 */
exports.handleDeleteResp = (req, res) => {

    if(res.statusCode === 400){
        res.json({
            isSuccess: false,
            message: "Bad Request,try to put a Number Value as the index",
            code: res.statusCode
        });
    }

    if(res.statusCode === 404){
        res.json({
            isSuccess: false,
            message: "No data found, possibly it was already deleted",
            code: res.statusCode
        });
    }

    if(res.statusCode === 200){
        res.json({
            isSuccess: true,
            message: "Data has been deleted",
            code: res.statusCode
        });
    }

    if(res.statusCode === 500){
        res.json({
            isSuccess: true,
            message: "Internal server error",
            code: res.statusCode
        });
    }

    res.end();
}
