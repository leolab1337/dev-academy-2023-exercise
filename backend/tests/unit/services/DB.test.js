const mysql = require('mysql');
const util = require('util');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
const DB = require("../../../src/services/DB");

describe('DB', () => {
    let connectionStub;
    let queryStub;
    let endStub;

    beforeEach(() => {
        connectionStub = sinon.stub(mysql, 'createConnection').returns({
            query: () => {},
            end: () => {}
        });
        queryStub = sinon.stub().resolves([]);
        endStub = sinon.stub();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('makeQuery', () => {
        it('should make a query to the database and return the result', async () => {
            sinon.stub(util, 'promisify').returns(queryStub);
            connectionStub.returns({ query: queryStub, end: endStub });
            const sqlQuery = 'SELECT * FROM users';
            const params = [1, 2, 3];
            const result = await DB.makeQuery(sqlQuery, params);
            expect(connectionStub).to.be.calledOnce;
            expect(queryStub).to.be.calledWith(sqlQuery, params);
            expect(endStub).to.be.calledOnce;
            expect(result).to.deep.equal([]);
        });
    //
        it('should make a query to the database without params', async () => {
            sinon.stub(util, 'promisify').returns(queryStub);
            connectionStub.returns({ query: queryStub, end: endStub });
            const sqlQuery = 'SELECT * FROM users';
            const result = await DB.makeQuery(sqlQuery, null);
            expect(connectionStub).to.be.calledOnce;
            expect(queryStub).to.be.calledWith(sqlQuery);
            expect(endStub).to.be.calledOnce;
            expect(result).to.deep.equal([]);
        });

    describe('createGetCountOfRows', () => {
        it('should create a function that retrieves the count of rows from the specified table', async () => {
            sinon.stub(util, 'promisify').returns(queryStub);
            connectionStub.returns({ query: queryStub, end: endStub });
            const tableName = 'users';
            const getCountOfRows = DB.createGetCountOfRows(tableName);
            const result = await getCountOfRows();
            expect(connectionStub).to.be.calledOnce;
            expect(queryStub).to.be.calledWith(`SELECT COUNT(*) as count FROM ${tableName}`);
            expect(endStub).to.be.calledOnce;
            expect(result).to.deep.equal([]);
        });
    });

    describe('createGetAll', () => {
        it('should create a function that retrieves all records from a specified table', async () => {
            sinon.stub(util, 'promisify').returns(queryStub);
            connectionStub.returns({ query: queryStub, end: endStub });
            const tableName = 'users';
            const getAll = DB.createGetAll(tableName);
            const pageSize = 10;
            const pageNumber = 1;
            const result = await getAll(pageSize, pageNumber);
            const expectedQuery = `SELECT * FROM ${tableName} ORDER BY ID ASC LIMIT ? OFFSET ?;`;
            const expectedParams = [pageSize, 0];
            expect(connectionStub).to.be.calledOnce;
            expect(queryStub).to.be.calledWith(expectedQuery, expectedParams);
            expect(endStub).to.be.calledOnce;
            expect(result).to.deep.equal([]);
        });
    });

    describe('createInsertIntoTable', () => {
        it('should create an insert function that inserts an object into the specified table', async () => {
            sinon.stub(util, 'promisify').returns(queryStub);
            connectionStub.returns({ query: queryStub, end: endStub });
            const tableName = 'users';
            const insertIntoTable = DB.createInsertIntoTable(tableName);
            const objectToSave = { name: 'John', age: 25 };
            const result = await insertIntoTable(objectToSave);
            const expectedQuery = `INSERT INTO ${tableName} (name,age) VALUES (?,?)`;
            const expectedParams = Object.values(objectToSave);
            expect(connectionStub).to.be.calledOnce;
            expect(queryStub).to.be.calledWith(expectedQuery, expectedParams);
            expect(endStub).to.be.calledOnce;
        });
    });
    });


});
