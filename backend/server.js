require("dotenv").config({path: './.env'});
const express = require('express');
const cors = require('cors');
const path = require("path");
const CSVHandler = require('./src/services/CsvHandler');
const csvHandler = new CSVHandler();
const app = require('./swagger');
// const app = express();


app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static(path.join(__dirname, "backend")));

app.use(cors({credentials: true, origin: process.env.CORS_ORIGIN}));


app.use("/stations", require("./src/routes/stationsRoutes"));

app.use("/journeys", require("./src/routes/journeysRoutes"));

app.use("/hello", require("./src/routes/greetingRoute"));



// app.get('/hello', (req, res) => {
//     res.send('Hello World!')
// });


app.listen(process.env.SERVER_PORT, () => {
    displayLinks();
    // activate it when u need convert csv data to database;
    // csvHandler.saveFilesToDb();

});

function displayLinks(){
    console.log("----------------------");
    console.log(`HOME: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
    console.log("----------------------");
}
