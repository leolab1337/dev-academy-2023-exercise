require("dotenv").config({path: '../.env'});

const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(process.env.SERVER_PORT, () => {
    displayLinks();
});


function displayLinks(){
    console.log("----------------------");
    console.log(`HOME: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
    console.log("----------------------");
}
