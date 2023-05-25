const request  = require('supertest');
const {app,appRoutes}  = require("../../server");

const greetingRoute = appRoutes.greeting

describe("greetingRoute", function() {

    describe("GET",function (){

        it("should have status code 200", function(done) {
            request(app)
                .get(greetingRoute)
                .expect(200)
                .end(function(err, res){
                    if (err) {
                        return done(err)
                    };
                    return done();
                });
        });

        it("should have answer", function(done) {
            request(app)
                .get(greetingRoute)
                .expect(/Hello There!/)
                .end(function(err, res){
                    if (err) return done(err);
                    return done();
                });
        });

    })



});