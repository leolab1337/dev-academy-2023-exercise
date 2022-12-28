const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();

// Swagger set up
const swaggerDefinition = {
    info: {
        // API informations (required)
        title: 'Helsinki city bike app', // Title (required)
        version: '1.0.0', // Version (required)
        description: "Helsinki city bike app's API", // Description (optional)
    },
    basePath: '/', // Base path (optional),
    definitions: {
        GetJourneysAllSuccess: {
            type: 'object',
            properties: {
                isSuccess: {
                    type: 'boolean',
                    description: 'Indicates whether the request was successful',
                    default: 'true'
                },
                message: {
                    type: 'string',
                    description: 'Message describing the result of the request',
                    default: 'Data has been found'
                },
                totalCount: {
                    type: 'integer',
                    description: 'Total number of records in the result',
                    default: '3315928'
                },
                result: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'integer',
                                description: 'Unique identifier for the bike rental',
                                default: '1999995'
                            },
                            Departure_time: {
                                type: 'string',
                                format: 'date-time',
                                description: 'Time at which the bike was rented',
                                default: '2021-06-08T16:05:56.000Z'
                            },
                            Return_time: {
                                type: 'string',
                                format: 'date-time',
                                description: 'Time at which the bike was returned',
                                default: '2021-06-08T16:16:39.000Z'
                            },
                            Departure_station_id: {
                                type: 'integer',
                                description: 'ID of the station where the bike was rented',
                                default: '24'
                            },
                            Departure_station_name: {
                                type: 'string',
                                description: 'Name of the station where the bike was rented',
                                default: 'Mannerheimintie'
                            },
                            Return_station_id: {
                                type: 'integer',
                                description: 'ID of the station where the bike was returned',
                                default: '5'
                            },
                            Return_station_name: {
                                type: 'string',
                                description: 'Name of the station where the bike was returned',
                                default: 'Sepänkatu'
                            },
                            Covered_distance_in_meters: {
                                type: 'integer',
                                description: 'Distance traveled in meters during the bike rental',
                                default: '1978'
                            },
                            Duration_in_sec: {
                                type: 'integer',
                                description: 'Duration of the bike rental in seconds',
                                default: '642'
                            },
                        },
                    },
                },
                code:{
                    type: 'integer',
                    description: 'Success status code',
                    default: '200'
                }
            },
        },
        GetJourneyOneSuccess:{
            type: 'object',
            properties: {
                isSuccess: {
                    type: 'boolean',
                    description: 'Indicates whether the request was successful',
                    default: 'true'
                },
                message: {
                    type: 'string',
                    description: 'Message describing the result of the request',
                    default: 'Data has been found'
                },
                result: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'integer',
                                description: 'Unique identifier for the bike rental',
                                default: '1999995'
                            },
                            Departure_time: {
                                type: 'string',
                                format: 'date-time',
                                description: 'Time at which the bike was rented',
                                default: '2021-06-08T16:05:56.000Z'
                            },
                            Return_time: {
                                type: 'string',
                                format: 'date-time',
                                description: 'Time at which the bike was returned',
                                default: '2021-06-08T16:16:39.000Z'
                            },
                            Departure_station_id: {
                                type: 'integer',
                                description: 'ID of the station where the bike was rented',
                                default: '24'
                            },
                            Departure_station_name: {
                                type: 'string',
                                description: 'Name of the station where the bike was rented',
                                default: 'Mannerheimintie'
                            },
                            Return_station_id: {
                                type: 'integer',
                                description: 'ID of the station where the bike was returned',
                                default: '5'
                            },
                            Return_station_name: {
                                type: 'string',
                                description: 'Name of the station where the bike was returned',
                                default: 'Sepänkatu'
                            },
                            Covered_distance_in_meters: {
                                type: 'integer',
                                description: 'Distance traveled in meters during the bike rental',
                                default: '1978'
                            },
                            Duration_in_sec: {
                                type: 'integer',
                                description: 'Duration of the bike rental in seconds',
                                default: '642'
                            },
                        },
                    },
                },
                code:{
                    type: 'integer',
                    description: 'Success status code',
                    default: '200'
                }
            },
        },
        SuccessDeleteResponse: {
            type: 'object',
            properties: {
                isSuccess: {
                    type: 'boolean',
                    default: true
                },
                message: {
                    type: 'string',
                    default: 'Data has been deleted'
                },
                code: {
                    type: 'number',
                    default: 200
                },
            },
        },
        BadRequestResponseGetDelete: {
            type: 'object',
            properties: {
                isSuccess: {
                    type: 'boolean',
                    default: false
                },
                message: {
                    type: 'string',
                    default: 'Bad Request,try to put a Number Value as the index'
                },
                code: {
                    type: 'number',
                    default: 400
                },
            },
        },
        BadRequestResponsePost: {
            type: 'object',
            properties: {
                isSuccess: {
                    type: 'boolean',
                    default: false
                },
                message: {
                    type: 'string',
                    default: 'Bad Request,try to put a valid JSON / or it is possible that a station with an id already already exists'
                },
                code: {
                    type: 'number',
                    default: 400
                },
            },
        },
        NotFoundResponse: {
            type: 'object',
            properties: {
                isSuccess: {
                    type: 'boolean',
                    default: false
                },
                message: {
                    type: 'string',
                    default: 'Not found'
                },
                code: {
                    type: 'number',
                    default: 404
                },
            },
        },
        NotFoundResponseDelete: {
            type: 'object',
            properties: {
                isSuccess: {
                    type: 'boolean',
                    default: false
                },
                message: {
                    type: 'string',
                    default: 'No data found, possibly it was already deleted'
                },
                code: {
                    type: 'number',
                    default: 404
                },
            },
        },
        InternalErrorResponse: {
            type: 'object',
            properties: {
                isSuccess: {
                    type: 'boolean',
                    default: false
                },
                message: {
                    type: 'string',
                    default: 'Internal server error'
                },
                code: {
                    type: 'number',
                    default: 500
                },
            },
        },
        GetStationsAllSuccess: {
            type: 'object',
            properties: {
                isSuccess: {
                    type: 'boolean',
                    description: 'Indicates whether the request was successful',
                    default: 'true'
                },
                message: {
                    type: 'string',
                    description: 'Message describing the result of the request',
                    default: 'Data has been found'
                },
                totalCount: {
                    type: 'integer',
                    description: 'Total number of records in the result',
                    default: '3315928'
                },
                result: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            FID: {
                                type: 'integer',
                                description: 'Station id at the db scope',
                                default: '115'
                            },
                            ID: {
                                type: 'integer',
                                description: 'Station id at the global scope',
                                default: '5'
                            },
                            Nimi: {
                                type: 'string',
                                description: 'Name of the station in finnish',
                                default: 'Sepänkatu'
                            },
                            Namn: {
                                type: 'string',
                                description: 'Name of the station in swedish',
                                default: 'Smedsgatan'
                            },
                            Name: {
                                type: 'string',
                                description: 'Name of the station in english(finnish)',
                                default: 'Sepänkatu'
                            },
                            Osoite: {
                                type: 'string',
                                description: 'Address value in finnish',
                                default: 'Tehtaankatu 25'
                            },
                            Address: {
                                type: 'string',
                                description: 'Address value in swedish',
                                default: 'Fabriksgatan 25'
                            },
                            Kaupunki: {
                                type: 'string',
                                description: 'City value in finnish',
                                default: ''
                            },
                            Stad: {
                                type: 'string',
                                description: 'City value in swedish',
                                default: ''
                            },
                            Operaattor: {
                                type: 'string',
                                description: 'Operator value',
                                default: ''
                            },
                            Kapasiteet: {
                                type: 'integer',
                                description: 'Kapasiteet value',
                                default: '32'
                            },
                            x: {
                                type: 'number',
                                format: 'float',
                                description: 'x value',
                                default: '24.9363'
                            },
                            y: {
                                type: 'number',
                                format: 'float',
                                description: 'y value',
                                default: '24.9363'
                            },
                        },
                    },
                },
                code:{
                    type: 'integer',
                    description: 'Success status code',
                    default: '200'
                }
            },
        },
        GetStationOneSuccess: {
            type: 'object',
            properties: {
                isSuccess: {
                    type: 'boolean',
                    description: 'Indicates whether the request was successful',
                    default: 'true'
                },
                message: {
                    type: 'string',
                    description: 'Message describing the result of the request',
                    default: 'Data has been found'
                },
                result: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            FID: {
                                type: 'integer',
                                description: 'Station id at the db scope',
                                default: '115'
                            },
                            ID: {
                                type: 'integer',
                                description: 'Station id at the global scope',
                                default: '5'
                            },
                            Nimi: {
                                type: 'string',
                                description: 'Name of the station in finnish',
                                default: 'Sepänkatu'
                            },
                            Namn: {
                                type: 'string',
                                description: 'Name of the station in swedish',
                                default: 'Smedsgatan'
                            },
                            Name: {
                                type: 'string',
                                description: 'Name of the station in english(finnish)',
                                default: 'Sepänkatu'
                            },
                            Osoite: {
                                type: 'string',
                                description: 'Address value in finnish',
                                default: 'Tehtaankatu 25'
                            },
                            Address: {
                                type: 'string',
                                description: 'Address value in swedish',
                                default: 'Fabriksgatan 25'
                            },
                            Kaupunki: {
                                type: 'string',
                                description: 'City value in finnish',
                                default: ''
                            },
                            Stad: {
                                type: 'string',
                                description: 'City value in swedish',
                                default: ''
                            },
                            Operaattor: {
                                type: 'string',
                                description: 'Operator value',
                                default: ''
                            },
                            Kapasiteet: {
                                type: 'integer',
                                description: 'Kapasiteet value',
                                default: '32'
                            },
                            x: {
                                type: 'number',
                                format: 'float',
                                description: 'x value',
                                default: '24.9363'
                            },
                            y: {
                                type: 'number',
                                format: 'float',
                                description: 'y value',
                                default: '24.9363'
                            },
                        },
                    },
                },
                code:{
                    type: 'integer',
                    description: 'Success status code',
                    default: '200'
                }
            },
        },
        PostNewStation:{
            type: 'object',
            properties: {
                isSuccess: {
                    type: 'boolean',
                    description: 'Indicates whether the request was successful',
                    default: 'true'
                },
                message: {
                    type: 'string',
                    description: 'Message describing the result of the request',
                    default: 'Data has been Posted'
                },
                code:{
                    type: 'integer',
                    description: 'Success status code',
                    default: '200'
                },
                result: {
                    type: 'array',
                    added: {
                        type: 'object',
                        properties: {
                            ID: {
                                type: 'integer',
                                description: 'Station id at the global scope',
                                default: '33333313'
                            },
                            Nimi: {
                                type: 'string',
                                description: 'Name of the station in finnish',
                                default: 'testtesttesttesttesttesttestta'
                            },
                            Namn: {
                                type: 'string',
                                description: 'Name of the station in swedish',
                                default: 'test'
                            },
                            Name: {
                                type: 'string',
                                description: 'Name of the station in english(finnish)',
                                default: 'test'
                            },
                            Osoite: {
                                type: 'string',
                                description: 'Address value in finnish',
                                default: 'testtesttesttesttesttesttestte'
                            },
                            Address: {
                                type: 'string',
                                description: 'Address value in swedish',
                                default: 'test'
                            },
                            Kaupunki: {
                                type: 'string',
                                description: 'City value in finnish',
                                default: 'test'
                            },
                            Stad: {
                                type: 'string',
                                description: 'City value in swedish',
                                default: 'test'
                            },
                            Operaattor: {
                                type: 'string',
                                description: 'Operator value',
                                default: 'test'
                            },
                            Kapasiteet: {
                                type: 'integer',
                                description: 'Kapasiteet value',
                                default: '16'
                            },
                            x: {
                                type: 'number',
                                format: 'float',
                                description: 'x value',
                                default: '10.1'
                            },
                            y: {
                                type: 'number',
                                format: 'float',
                                description: 'y value',
                                default: '56.2'
                            },
                        },
                    },
                },
            },
        },
    },
}

// Options for the swagger docs
const options = {
    // Import swaggerDefinitions
    swaggerDefinition,
    // Path to the API docs
    // apis: ['./routes/*.js'],
    apis: ['./src/routes/*.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

// Serve swagger docs the way you like (Recommendation: swagger-tools)
app.get('/api-docs.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Serve the Swagger UI on the root path
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
