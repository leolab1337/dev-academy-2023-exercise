const sinon = require('sinon');
const { expect } = require('chai');
const {BaseController} = require("../../../src/controllers/base.controller");

describe('BaseController', () => {
    let service;
    let req;
    let res;
    let next;

    beforeEach(() => {
        service = {
            getCountOfRows: sinon.stub(),
            getAll: sinon.stub(),
            getById: sinon.stub(),
            deleteById: sinon.stub(),
        };

        req = {
            query: {},
            params: {},
        };

        res = {
            statusCode: 0,
            result: null,
            totalCount: 0,
        };

        controller = new BaseController(service);

        next = sinon.stub();
    });




    afterEach(() => {
        sinon.restore();
    });

    describe('getAll', () => {
        it('should set the response with status code 200, result, and totalCount when successful', async () => {


            const rowsCount = [{ count: 10 }];
            const getAllResult = [{ id: 1, name: 'Example' }];

            service.getCountOfRows.resolves(rowsCount);
            service.getAll.resolves(getAllResult);

            req.query.pageSize = 5;
            req.query.pageNumber = 2;

            await controller.getAll(req, res, next);

            expect(service.getCountOfRows.calledOnce).to.be.true;
            expect(service.getAll.calledOnce).to.be.true;
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.deep.equal(getAllResult);
            expect(res.totalCount).to.equal(rowsCount[0].count);
            expect(next.calledOnce).to.be.true;
        });

        it('should set the response with status code 404 when either resp or rowsCount is falsy', async () => {


            service.getCountOfRows.resolves(null);
            service.getAll.resolves([{ id: 1, name: 'Example' }]);

            await controller.getAll(req, res, next);

            expect(service.getCountOfRows.calledOnce).to.be.true;
            expect(service.getAll.calledOnce).to.be.true;
            expect(res.statusCode).to.equal(404);
            expect(next.calledOnce).to.be.true;
        });

        // it('should set the response with status code 500 when an error occurs', async () => {
        //
        //     service.getCountOfRows.rejects(new Error('DB connection error'));
        //
        //     await controller.getAll(req, res, next);
        //
        //     expect(service.getCountOfRows.calledOnce).to.be.true;
        //     expect(service.getAll.called).to.be.false;
        //     expect(res.statusCode).to.equal(500);
        //     expect(next.calledOnce).to.be.true;
        // });
    });

    describe('getById', () => {
        it('should set the response with status code 200 and result when successful', async () => {
            const getByIdResult = { id: 1, name: 'Example' };

            service.getById.resolves(getByIdResult);

            req.params.id = '1';

            await controller.getById(req, res, next);

            expect(service.getById.calledOnce).to.be.true;
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.deep.equal(getByIdResult);
            expect(next.calledOnce).to.be.true;
        });

        it('should set the response with status code 404 when resp is null', async () => {
            service.getById.resolves(null);

            req.params.id = '1';

            await controller.getById(req, res, next);

            expect(service.getById.calledOnce).to.be.true;
            expect(res.statusCode).to.equal(404);
            expect(next.calledOnce).to.be.true;
        });

        it('should set the response with status code 400 when req.params.id is not a number', async () => {
            req.params.id = 'abc';

            await controller.getById(req, res, next);

            expect(service.getById.called).to.be.false;
            expect(res.statusCode).to.equal(400);
            expect(next.calledOnce).to.be.true;
        });

        // it('should set the response with status code 500 when an error occurs', async () => {
        //
        //     service.getById.rejects(new Error('DB connection error'));
        //
        //     req.params.id = '1';
        //
        //     await controller.getById(req, res, next);
        //
        //     expect(service.getById.calledOnce).to.be.true;
        //     expect(res.statusCode).to.equal(500);
        //     expect(next.calledOnce).to.be.true;
        // });
    });

    describe('deleteById', () => {
        it('should set the response with status code 200 and result when successful', async () => {
            const getByIdResult = { id: 1, name: 'Example' };
            const deleteByIdResult = { success: true };

            service.getById.resolves(getByIdResult);
            service.deleteById.resolves(deleteByIdResult);

            req.params.id = '1';

            await controller.deleteById(req, res, next);

            expect(service.getById.calledOnce).to.be.true;
            expect(service.deleteById.calledOnce).to.be.true;
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.deep.equal(deleteByIdResult);
            expect(next.calledOnce).to.be.true;
        });

        it('should set the response with status code 404 when resp1 is null', async () => {
            const controller = new BaseController(service);

            service.getById.resolves(null);

            req.params.id = '1';

            await controller.deleteById(req, res, next);

            expect(service.getById.calledOnce).to.be.true;
            expect(service.deleteById.called).to.be.false;
            expect(res.statusCode).to.equal(404);
            expect(next.calledOnce).to.be.true;
        });

        it('should set the response with status code 400 when req.params.id is not a number', async () => {
            const controller = new BaseController(service);

            req.params.id = 'abc';

            await controller.deleteById(req, res, next);

            expect(service.getById.called).to.be.false;
            expect(service.deleteById.called).to.be.false;
            expect(res.statusCode).to.equal(400);
            expect(next.calledOnce).to.be.true;
        });

        // it('should set the response with status code 500 when an error occurs', async () => {
        //     const controller = new BaseController(service);
        //
        //     service.getById.rejects(new Error('DB connection error'));
        //
        //     req.params.id = '1';
        //
        //     await controller.deleteById(req, res, next);
        //
        //     expect(service.getById.calledOnce).to.be.true;
        //     expect(service.deleteById.called).to.be.false;
        //     expect(res.statusCode).to.equal(500);
        //     expect(next.calledOnce).to.be.true;
        // });
    });
});
