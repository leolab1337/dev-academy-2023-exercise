const mysql = require("mysql");
const util = require("util");


const dbConfig = {
    host: process.env.SERVER_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
};

/**
 * The class for contains methods for working with database
 */
class DB{
    /**
     * The function makes query to the database and return the result(as Promise with object).
     * @param {string} sqlQuery any sql query, "?" can be used
     * @param {(number|number)[]} [params] params for all "?" in sql query, can be also null
     * @returns {Promise} promise with result object
     */
    static async makeQuery(sqlQuery, params) {
        const con = mysql.createConnection(dbConfig);
        const query = util.promisify(con.query).bind(con);

        try {
            if (params !== null)
                return await query(sqlQuery, params);
            else
                return await query(sqlQuery);
        } catch (err) {
            console.log(err);
        } finally {
            con.end();
        }
    }

    /**

     Creates a function that retrieves the count of rows from the specified table name.
     @param {string} tableName - The name of the table to retrieve the count of rows from.
     @returns {Function} - An asynchronous function that, when called, returns the count of rows as a response or null if an error occurs.
     */
    static createGetCountOfRows(tableName) {
        return async () => {
            try {
                const selectTokenQ = `SELECT COUNT(*) as count FROM ${tableName}`;
                const resp = await DB.makeQuery(selectTokenQ);
                return resp || null;
            } catch (e) {
                console.log(e);
                return null;
            }
        }
    }

    /**
     * Creates a static method for retrieving all records from a specified table.
     *
     * @static
     * @param {string} tableName - The name of the table to retrieve records from.
     * @returns {function(pageSize: number, pageNumber: number): Promise<Object[]|null>} - A function that accepts page size and page number parameters and returns a Promise that resolves to an array of records or null if an error occurs.
     */
    static createGetAll(tableName) {
        /**
         * Retrieves all records from the specified table.
         *
         * @async
         * @param {number} [pageSize=10] - The number of records to fetch per page.
         * @param {number} [pageNumber=1] - The page number to fetch.
         * @returns {Promise<Object[]|null>} - A Promise that resolves to an array of records or null if an error occurs.
         */
        return async (pageSize = 10, pageNumber = 1) => {
            // Calculate the offset based on the page size and number
            const offset = (pageNumber - 1) * pageSize;
            try {
                let resp;
                // Select all stations from the database, ordered by ID and limited by the page size and offset
                const selectTokenQ = `SELECT * FROM ${tableName} ORDER BY ID ASC LIMIT ? OFFSET ?;`;
                resp = await DB.makeQuery(selectTokenQ, [pageSize, offset]);
                if (resp) {
                    return resp;
                }
            } catch (e) {
                console.log(e);
            }
            return null;
        };
    }


    /**
     * Creates a function that retrieves data from a specific table based on a parameter.
     * @param {string} tableName - The name of the table to query.
     * @param {string} paramName - The name of the parameter to match in the query.
     * @returns {Function} - The generated function that accepts a parameter value and returns the query result.
     */
    static createGetByParam(tableName, paramName) {
        return async (paramValue) => {
            try {
                let resp;
                const selectTokenQ = `SELECT * FROM ${tableName} WHERE ${paramName} = ?`;
                resp = await DB.makeQuery(selectTokenQ, paramValue);

                if (resp.length !== 0) {
                    return resp;
                } else {
                    throw new Error('No data found');
                }
            } catch (e) {
                console.log(e);
                return null;
            }
        }
    }


    /**
     * Creates a delete function by parameter for a specified table.
     * @param {string} tableName - The name of the table to delete data from.
     * @param {string} paramName - The name of the parameter used in the WHERE clause.
     * @returns {Function} A delete function that accepts a parameter value and deletes data from the specified table based on the parameter.
     */
    static createDeleteByParam(tableName, paramName) {
        /**
         * Deletes data from the specified table based on the parameter value.
         * @param {*} paramValue - The value of the parameter used in the WHERE clause.
         * @returns {Promise} A promise that resolves with the result of the delete operation.
         * If data is deleted, the result will be returned. Otherwise, an error will be thrown.
         * If an error occurs during the delete operation, null will be returned.
         */
        return async (paramValue) => {
            try {
                let resp;
                const deleteTokenQ = `DELETE FROM ${tableName} WHERE ${paramName} = ?`;
                resp = await DB.makeQuery(deleteTokenQ, paramValue);

                if (resp.length !== 0) {
                    return resp;
                } else {
                    throw new Error('No data deleted');
                }
            } catch (e) {
                console.log(e);
                return null;
            }
        };
    }


    /**
     * Creates an insert query for a specific table.
     *
     * @param {string} tableName - The name of the table to insert into.
     * @returns {(objectToSave: Object) => Promise<any>} - A function that accepts an object to save and executes the insert query.
     */
    static createInsertIntoTable(tableName) {
        /**
         * Inserts an object into the specified table.
         *
         * @param {Object} objectToSave - The object to save.
         * @returns {Promise} - A promise that resolves with the result of the insert query.
         */
        return async (objectToSave) => {
            const columns = Object.keys(objectToSave);
            const values = Object.values(objectToSave);

            const placeholders = Array(values.length).fill("?").join(",");
            const query = `INSERT INTO ${tableName} (${columns.join(",")}) VALUES (${placeholders})`;

            return await DB.makeQuery(query, values);
        };
    }

}

module.exports = DB;
