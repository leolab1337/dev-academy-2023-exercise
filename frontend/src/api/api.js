/**
 *
 * @param url{string}
 * @returns {Promise<any>}
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
 *
 * @param url{string}
 * @returns {Promise<any>}
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
 *
 * @param url{string}
 * @returns {Promise<any>}
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
 *
 * @param url{string}
 * @param reqData{object}
 * @returns {Promise<any>}
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
