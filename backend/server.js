require("dotenv").config({path: '../.env'});
const express = require('express');
const path = require("path");
const CSVHandler = require('./src/services/CsvHandler');
const csvHandler = new CSVHandler();

const app = express();


app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static(path.join(__dirname, "backend")));


app.use("/stationsCrud", require("./src/routes/stationsCrud"));



app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.listen(process.env.SERVER_PORT, () => {
    displayLinks();

    // activate it when u need convert csv data to database;
    // csvHandler.saveFilesToDb();



});

// app.use(require)


function displayLinks(){
    console.log("----------------------");
    console.log(`HOME: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
    console.log("----------------------");
}
