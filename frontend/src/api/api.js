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

    const resp = await fetch(url, reqOptions);
    const respJson = resp.json();
    return respJson
}
