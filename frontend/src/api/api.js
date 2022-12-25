/**
 *Sends a GET request to the specified URL and returns the response in JSON format.
 *@param {string} url - The URL to send the request to.
 *@return {Promise} - A promise that resolves to the JSON response or rejects with an error.
 */
export const fetchAllData = async (url) => {

    const reqOptions = {
        headers:{
            'Content-Type': 'application/json'
        },
        method: 'GET',
        credentials: 'include'
    }

    try{
    const resp = await fetch(url, reqOptions);
        return resp.json();
    }
    catch (e){
        return e;
    }

}

/**
 *  Sends a GET request to the specified URL and returns the response in JSON format.
 *  @param {string} url - The URL to send the request to.
 *  @return {Promise} - A promise that resolves to the JSON response or rejects with an error.
 */
export const fetchOneById = async (url) => {
    const reqOptions = {
        headers:{
            'Content-Type': 'application/json'
        },
        method: 'GET',
        credentials: 'include'
    }
    try{
        const resp = await fetch(url, reqOptions);
        return resp.json();
    }
    catch (e){
        return e;
    }
}

/**
* Sends a DELETE request to the specified URL and returns the response in JSON format.
* @param {string} url - The URL to send the request to.
* @return {Promise} - A promise that resolves to the JSON response or rejects with an error.
 */
export const deleteById = async (url) => {
    const reqOptions = {
        headers:{
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        credentials: 'include'
    }
    try{
        const resp = await fetch(url, reqOptions);
        return resp.json();
    }
    catch (e){
        return e;
    }
}

/**
 * Sends a POST request with the specified data to the specified URL.
 * @param {string} url - The URL to send the request to.
 * @param {Object} reqData - The data to send in the request body.
 * @return {Promise<Object|Error>} A promise that resolves with the response data as a JSON object, or rejects with an error.
 */
export const postNewOne = async (url,reqData) => {
    const reqOptions = {
        headers:{
            'Content-Type': 'application/json'
        },
        method: 'POST',
        credentials: 'include',
        // body: {...reqData}
        body: JSON.stringify({...reqData})
    }
    try{
        const resp = await fetch(url, reqOptions);
        return resp.json();
    }
    catch (e){
        return e;
    }
}
