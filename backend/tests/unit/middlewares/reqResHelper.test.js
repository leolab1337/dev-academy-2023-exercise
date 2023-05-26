const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const { handleGetResp, handlePostResp, handlePutResp, handleDeleteResp } = require("../../../src/middlewares/reqResHelper");

describe('reqResHelper Middleware', () => {
    describe('handleGetResp', () => {

        let req, res;

        beforeEach(() => {
            req = {}; // Initialize the request object if required
            res = {
                statusCode: 200,
                result: [1, 2, 3],
                totalCount: 10,
                json: sinon.spy(),
                end: sinon.spy()
            };
        });

        afterEach(() => {
            // Restore stubs after each test
            sinon.restore();
        });

        it('should send default response with isSuccess true for statusCode 200', () => {
            handleGetResp(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({
                isSuccess: true,
                message: 'Data has been found',
                totalCount: 10,
                result: [1, 2, 3],
                code: 200
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });

        it('should send default response with isSuccess false for statusCode 400', () => {
            res.statusCode = 400;
            handleGetResp(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({
                isSuccess: false,
                message: 'Bad Request,try to put a Number Value as the index',
                code: 400,
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });


        it('should send default response with isSuccess false for statusCode 404', () => {
            res.statusCode = 404;
            handleGetResp(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({
                isSuccess: false,
                message: 'No data found',
                code: 404
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });

        it('should send default response with isSuccess false for statusCode 500', () => {
            res.statusCode = 500;
            handleGetResp(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({
                isSuccess: false,
                message: 'Internal server error',
                code: 500
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });
    });



    describe('handlePostResp', () => {
        let req, res;

        beforeEach(() => {
            // Create mock request and response objects for each test
            req = {};
            res = {
                json: sinon.spy(),
                end: sinon.spy(),
            };
        });

        it('should send a default response for statusCode 200', () => {
            res.statusCode = 200;
            res.result = 'some result';

            handlePostResp(req, res);

            // Assertions
            expect(res.json.calledOnce).to.be.true;

            expect(res.json.calledWith({
                isSuccess: true,
                message: 'Data has been Posted',
                code: res.statusCode,
                added: res.result,
            })).to.be.true;

            expect(res.end.calledOnce).to.be.true;
        });

        it('should send a default response for statusCode 400', () => {
            res.statusCode = 400;

            handlePostResp(req, res);

            // Assertions
            expect(res.json.calledOnce).to.be.true;

            expect(res.json.calledWith({
                isSuccess: false,
                message: 'Bad Request,try to put a valid JSON',
                code: res.statusCode,
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });

        it('should send a default response for statusCode 404', () => {
            res.statusCode = 404;

            handlePostResp(req, res);

            // Assertions
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({
                isSuccess: false,
                message: 'No data found',
                code: res.statusCode,
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });

        it('should send a default response for statusCode 500', () => {
            res.statusCode = 500;

            handlePostResp(req, res);

            // Assertions
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({
                isSuccess: false,
                message: 'Internal server error',
                code: res.statusCode,
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });

        it('should send a default response for any other statusCode', () => {
            res.statusCode = 123;

            handlePostResp(req, res);

            // Assertions
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({
                isSuccess: false,
                message: 'Internal server error',
                code: 500,
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });
    });


    describe('handleDeleteResp', () => {
        let req, res;

        beforeEach(() => {
            req = {}; // Initialize the request object if required
            res = {
                statusCode: 200,
                json: sinon.spy(),
                end: sinon.spy()
            };
        });

        it('should send default response with isSuccess false for statusCode 400', () => {
            res.statusCode = 400;
            handleDeleteResp(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({
                isSuccess: false,
                message: 'Bad Request,try to put a Number Value as the index',
                code: 400
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });

        it('should send default response with isSuccess false for statusCode 404', () => {
            res.statusCode = 404;
            handleDeleteResp(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({
                isSuccess: false,
                message: 'No data found, possibly it was already deleted',
                code: 404
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });

        it('should send default response with isSuccess true for statusCode 200', () => {
            handleDeleteResp(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({
                isSuccess: true,
                message: 'Data has been deleted',
                code: 200
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });

        it('should send default response with isSuccess false for statusCode 500', () => {
            res.statusCode = 500;
            handleDeleteResp(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({
                isSuccess: false,
                message: 'Internal server error',
                code: 500
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });
    });


    describe('handlePutResp', () => {
        let req, res;

        beforeEach(() => {
            req = {};
            res = {
                statusCode: null,
                json: sinon.spy(),
                end: sinon.spy()
            };
        });

        it('should send a default response with isSuccess set to true when statusCode is 200', () => {
            res.statusCode = 200;
            handlePutResp(req, res);
            expect(res.json.calledTwice).to.be.true;
            expect(res.json.calledWith({
                isSuccess: true,
                message: 'Data has been updated',
                code: 200,
                result: res.result
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });

        it('should send a default response with isSuccess set to false and a specific message when statusCode is 400', () => {
            res.statusCode = 400;
            handlePutResp(req, res);
            expect(res.json.calledTwice).to.be.true;
            expect(res.json.calledWith({
                isSuccess: false,
                message: 'Bad Request,try to put a valid JSON',
                code: 400
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });

        it('should send a default response with isSuccess set to false and a specific message when statusCode is 404', () => {
            res.statusCode = 404;
            handlePutResp(req, res);
            expect(res.json.calledTwice).to.be.true;
            expect(res.json.calledWith({
                isSuccess: false,
                message: 'No data found',
                code: 404
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });

        it('should send a default response with isSuccess set to false and a specific message when statusCode is 500', () => {
            res.statusCode = 500;
            handlePutResp(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({
                isSuccess: false,
                message: 'Internal server error',
                code: 500
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });

        it('should send a default response with isSuccess set to false and a generic message for other statusCode values', () => {
            res.statusCode = 123;
            handlePutResp(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({
                isSuccess: false,
                message: 'Problems with updating data'
            })).to.be.true;
            expect(res.end.calledOnce).to.be.true;
        });
    });




});
