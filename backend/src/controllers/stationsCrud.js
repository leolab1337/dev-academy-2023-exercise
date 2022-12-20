const stationsCrudService = require("../services/stationsCrud");
const {isStringNumberFloat, isNumberFloat} = require("../utils/isFloat");

getAllStations = async (req, res, next) => {
    try{
        const resp = await stationsCrudService.getAllStations()
        if(resp){
            res.statusCode = 200;
            res.result = resp;
        }
        else{
            res.statusCode = 404;
        }
    } catch (e){
        console.log("No connection to the DB or problems with query");
        console.log(e);
        res.statusCode = 500;
    }
    next();
}

postNewStation = async (req,res,next) =>{
    /**
     *
     * @type {{Namn: string, Kapasiteet: number, Nimi: string, Stad: string, Address: string, Kaupunki: string, Osoite: string, x: number, y: number, Operaattor: string, ID: number, Name: string}}
     */
    const objectToSave = {
        "ID" : null,
        "Nimi" : '',
        "Namn" : '',
        "Name" : '',
        "Osoite": '',
        "Address": '',
        "Kaupunki" : '',
        "Stad": '',
        "Operaattor" : '',
        "Kapasiteet" : 10,
        "x" : 1.1,
        "y" : 1.1
    }

    if(req.body !== null){
        try {

            if(!req.body.ID){
                res.statusCode = 400;
                res.statusMessage = 'Bad Request, please add ID';
                throw new Error(res.statusMessage);
            }

            if(!req.body.Nimi && !req.body.Namn && !req.body.Name){
                res.statusCode = 400;
                res.statusMessage = 'Bad Request, please add at least one of them : Nimi , Namn or Name field';
                throw new Error(res.statusMessage);
            }

            if(!req.body.x || !req.body.y){
                res.statusCode = 400;
                res.statusMessage = 'Bad Request, please add fields x and y';
                throw new Error(res.statusMessage);
            }



            for (const [key, value] of Object.entries(req.body)) {
                switch (key) {
                    case 'ID':
                        if (!isNaN(value)) {
                                if(isStringNumberFloat(value) || isNumberFloat(value) ){
                                    res.statusCode = 400;
                                    res.statusMessage = 'ID cannot have a float value, please use an integer one';
                                    throw new Error(res.statusMessage);
                                }
                                else{
                                    const stationByNewId = await stationsCrudService.getStationById(value);

                                    if(stationByNewId && stationByNewId[0].ID.toString() === value.toString()){
                                        res.statusCode = 400;
                                        res.statusMessage = 'Such Id is already in use, please change it';
                                        throw new Error(res.statusMessage);
                                    }

                                    else{
                                        objectToSave[key] = value;
                                    }
                                }
                        }
                        else {
                            res.statusCode = 400;
                            res.statusMessage = 'Id is not a number';
                            throw new Error(res.statusMessage);
                        }
                        break;
                    case 'Nimi':
                    case 'Namn':
                    case 'Name':
                    case 'Osoite':
                    case 'Address':
                    case 'Kaupunki':
                    case 'Stad':
                    case 'Operaattor':
                        if(isNaN(value) && value.length <= 30){
                            objectToSave[key] = value;
                        }
                        else{
                            res.statusCode = 400;
                            res.statusMessage = `${key}'s value is not a number or length of its is longer than 30 symbols`;
                            throw new Error(res.statusMessage);
                        }
                        break;
                    case 'Kapasiteet':
                        if (!isNaN(value)) {
                            if(isStringNumberFloat(value) || isNumberFloat(value) ){
                                res.statusCode = 400;
                                res.statusMessage = 'Kapasiteet cannot have a float value, please use an integer one';
                                throw new Error(res.statusMessage);
                            }
                            else{
                                objectToSave[key] = value;
                            }
                        }
                        else {
                            res.statusCode = 400;
                            res.statusMessage = 'Kapasiteet value is not a number';
                            throw new Error(res.statusMessage);
                        }
                        break;
                    case 'x':
                    case 'y':
                        if(!isNaN(value) && isStringNumberFloat(value) || isNumberFloat(value)){
                            objectToSave[key] = value;
                        }
                        else{
                            res.statusCode = 400;
                            res.statusMessage = 'Kapasiteet value is not a float number';
                            throw new Error(res.statusMessage);
                        }
                        break;
                }
            }

            try{

                if(objectToSave.ID !== null){
                    const resp = await stationsCrudService.postNewStation(objectToSave);
                    if(resp){
                        res.statusCode = 200;
                        res.result = objectToSave;
                    }
                    else{
                        res.statusCode = 400;
                    }
                }
                else{
                    res.statusCode = 400;
                }
            } catch (e){
                console.log("No connection to the DB or problems with query");
                console.log(e);
                res.statusCode = 500;
            }
        }
        catch (e){
            console.log(e);
        }
    }
    else {
        res.statusCode = 400;
    }

    next();
}

// Todo updateStation controller
updateStation = async (req,res,next) =>{

    console.log(req.body);

    // try{
    //     const resp = await stationsCrudService.getAllStations()
    //     if(resp){
    //         res.statusCode = 200;
    //         res.result = resp;
    //     }
    //     else{
    //         res.statusCode = 404;
    //     }
    // } catch (e){
    //     console.log("No connection to the DB or problems with query");
    //     console.log(e);
    //     res.statusCode = 500;
    // }
    next();
}



getStationById = async (req, res, next) => {

    try{
        if(!isNaN(req.params.id)){
            const resp = await stationsCrudService.getStationById(req.params.id);
            if(resp !== null ){
                res.statusCode= 200;
                res.result = resp;
            }
            else{
                res.statusCode = 404;
            }

        }
        else{
            res.statusCode = 400;
        }


    } catch (e){
        console.log("No connection to the DB or problems with query");
        console.log(e);
        res.statusCode = 500;
    }
    next();
}

deleteStationById = async (req, res, next) => {
    try{
        if(!isNaN(req.params.id)){

            const resp1 = await stationsCrudService.getStationById(req.params.id);

            if(resp1 !== null){
                const resp = await stationsCrudService.deleteStationById(req.params.id);
                if(resp){
                    res.statusCode = 200;
                    res.result = resp;
                }
            }
            else{
                res.statusCode = 404;
            }
        }
        else{
            res.statusCode = 400;
        }

    } catch (e){
            console.log("No connection to the DB or problems with query");
            console.log(e);
            res.statusCode = 500;
    }
    next();
}


module.exports = {
    getStationById,
    postNewStation,
    updateStation,
    getAllStations,
    deleteStationById
}



