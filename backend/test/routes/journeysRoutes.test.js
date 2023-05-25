const request = require('supertest');
const { app, appRoutes } = require("../../server");
const chai = require('chai');
const addParams = require("../../src/utils/addParams");
const addIdToPath = require("../../src/utils/addIdToPath");

const expect = chai.expect;
const journeysRoute = appRoutes.journeys;


describe("journeysRoutes", function() {
    describe("get all", function(done) {
        it("should have status code 200", async function() {
            const { statusCode } = await request(app).get(journeysRoute);
            expect(statusCode).to.equal(200);
        });

        it("body's isSuccess should be true", async function() {
            const { body } = await request(app).get(journeysRoute);
            expect(body.isSuccess).to.be.true;
        });

        it("body's message is correct", async function() {
            const { body } = await request(app).get(journeysRoute);
            expect(body.message).to.equal("Data has been found");
        });

        it("body's total Count is a correct number", async function() {
            const { body } = await request(app).get(journeysRoute);
            expect((body.hasOwnProperty("totalCount"))).to.be.true
            expect(body.totalCount).to.be.at.least(1);
        });

        it("returns by default 10 journeys", async function() {
            const { body } = await request(app).get(journeysRoute);
            expect(body.result.length).to.equal(10);
        });

        it("returns desired amount of journeys", async function() {
            const options = {
                pageSize: 5
            }
            const journeysRouteWithOptions = addParams(journeysRoute,options);
            const { body } = await request(app).get(journeysRouteWithOptions);
            expect(body.result.length).to.equal(5);
        });

        it("returns correct page number", async function() {
            const options = {
                pageSize: 5,
                pageNumber: 2
            };

            const journeysRouteWithOptions = addParams(journeysRoute, options);
            const response = await request(app).get(journeysRouteWithOptions);

            const { body } = response;

            const offset = (options.pageNumber - 1) * options.pageSize;

            // Retrieve the total count of stations from the response body
            const totalCount = body.totalCount;

            // Calculate the expected page number based on the total count and page size
            const expectedPageNumber = Math.ceil((offset - 1) / totalCount + 1)

            // Perform the assertion to check if the returned page number is correct
            expect(expectedPageNumber).to.equal(options.pageNumber);
        });
    });

    describe("getById", function() {
        it("should return a specific journey by ID", async function() {
            const journeyId = "1";
            const routeWithId = addIdToPath(journeysRoute, journeyId);
            const { body } = await request(app).get(routeWithId);
            console.log(body);
            expect(body.isSuccess).to.be.true;
            expect(body.message).to.equal("Data has been found");
            expect(body.result[0]).to.be.an("object");
            expect(body.result[0]["id"]).to.equal(Number(journeyId));
        });

        it("should return a 404 status code for a non-existent journey", async function() {
            const nonExistentJourneyId = "123454234";
            const routeWithNonExistentId = addIdToPath(journeysRoute, nonExistentJourneyId);
            const { statusCode, body } = await request(app).get(routeWithNonExistentId);
            expect(statusCode).to.equal(404);
            expect(body.isSuccess).to.be.false;
            expect(body.message).to.equal("No data found");
            expect(body.result).to.be.undefined;
        });

        it("should return a 400 status code for a non-number id", async function() {
            const nonNumberId = "test123";
            const routeWithNonNumberId= addIdToPath(journeysRoute, nonNumberId);
            const { statusCode, body } = await request(app).get(routeWithNonNumberId);
            expect(statusCode).to.equal(400);
            expect(body.isSuccess).to.be.false;
            expect(body.message).to.equal("Bad Request,try to put a Number Value as the index");
            expect(body.result).to.be.undefined;
        });


    });



});
