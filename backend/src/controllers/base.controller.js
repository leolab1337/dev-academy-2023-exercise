class BaseController{

    constructor(service) {
        this.service = service;
    }

    async getAll (req, res, next)  {

        const pageSize = req.query.pageSize || 10;
        const pageNumber = req.query.pageNumber || 1;

        try{
            const rowsCount = await this.service.getCountOfRows();
            const resp = await this.service.getAll(Number(pageSize),Number(pageNumber));
            if(resp && rowsCount){
                res.statusCode = 200;
                res.result = resp;
                res.totalCount = rowsCount[0]['count'];
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
    };

    async getById (req, res, next) {
        try{
            if(!isNaN(req.params.id)){
                const resp = await this.service.getById(req.params.id);
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
    };

    async deleteById (req, res, next)  {
        try{
            if(!isNaN(req.params.id)){

                const resp1 = await this.service.getById(req.params.id);

                if(resp1 !== null){
                    const resp = await this.service.deleteById(req.params.id);
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

}

module.exports = {
    BaseController
}