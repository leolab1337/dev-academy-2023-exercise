/**
 * Sends an HTTP request to the specified URL with the given options and returns the response in JSON format.
 * @param {string} url - The URL to send the request to.
 * @param {Object} options - The options for the request.
 * @return {Promise<Object|Error>} A promise that resolves with the response data as a JSON object, or rejects with an error.
 */
const sendRequest = async (url, options) => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };

    const reqOptions = { ...defaultOptions, ...options };

    try {
        const resp = await fetch(url, reqOptions);
        return resp.json();
    } catch (e) {
        return e;
    }
};

/**
 * Sends a GET request to the specified URL and returns the response in JSON format.
 * @param {string} url - The URL to send the request to.
 * @return {Promise<Object|Error>} A promise that resolves with the response data as a JSON object, or rejects with an error.
 */
export const getData = async (url) => {
    const options = {
        method: 'GET'
    };
    return sendRequest(url, options);
};

/**
 * Sends a DELETE request to the specified URL and returns the response in JSON format.
 * @param {string} url - The URL to send the request to.
 * @return {Promise<Object|Error>} A promise that resolves with the response data as a JSON object, or rejects with an error.
 */
export const deleteById = async (url) => {
    const options = {
        method: 'DELETE'
    };
    return sendRequest(url, options);
};

/**
 * Sends a POST request with the specified data to the specified URL.
 * @param {string} url - The URL to send the request to.
 * @param {Object} reqData - The data to send in the request body.
 * @return {Promise<Object|Error>} A promise that resolves with the response data as a JSON object, or rejects with an error.
 */
export const postNewOne = async (url, reqData) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(reqData)
    };
    return sendRequest(url, options);
};


/**
 * Creates a fetcher function based on the provided fetch type.
 *
 * @param {string} baseUrl - The base URL for the API.
 * @param {string} endpoint - The endpoint for the API.
 * @param {"getAll" | "getOne" | "deleteOne" | "postNewOne"} fetchType - The type of fetch operation to perform.
 * @returns {Function} - The fetcher function based on the fetch type.
 */
export const createFetcher = (baseUrl, endpoint, fetchType) => {
    const urlWithEndpoint = `${baseUrl}/${endpoint}`;
    const urlWithId = (id) => urlWithEndpoint + `/${id}`;

    /**
     * Returns an async function that fetches all items.
     *
     * @param {number} [pageSize] - The page size for pagination (optional).
     * @param {number} [pageNumber] - The page number for pagination (optional).
     * @returns {Promise<any>} - The response data.
     */
    const fetchAllItems = async (pageSize, pageNumber) => {
        let query = '';

        if (pageSize !== undefined && pageNumber !== undefined) {
            query = `?pageSize=${pageSize}&pageNumber=${pageNumber}`;
        }

        return await getData(urlWithEndpoint + query);
    };

    /**
     * Returns an async function that fetches a single item by ID.
     *
     * @param {string} id - The ID of the item.
     * @returns {Promise<any>} - The response data.
     */
    const fetchOneItem = async (id) => {
        return await getData(urlWithId(id));
    };

    /**
     * Returns an async function that deletes a single item by ID.
     *
     * @param {string} id - The ID of the item to delete.
     * @returns {Promise<any>} - The response data.
     */
    const deleteOneItem = async (id) => {
        return await deleteById(urlWithId(id));
    };

    /**
     * Returns an async function that posts a new item.
     *
     * @param {Object} reqData - The data of the new item to post.
     * @returns {Promise<any>} - The response data.
     */
    const postNewItem = async (reqData) => {
        return await postNewOne(urlWithEndpoint, reqData);
    };

    switch (fetchType) {
        case "getAll":
            return fetchAllItems;

        case "getOne":
            return fetchOneItem;

        case "deleteOne":
            return deleteOneItem;

        case "postNewOne":
            return postNewItem;

        default:
            throw new Error("Invalid fetch type: " + fetchType);
    }
};
