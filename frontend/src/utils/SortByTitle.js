// const mockStationsImport = require('../../../MockValues/mockStationsValidated');
// const mockStations = mockStationsImport["getMockValue"];


export class SortByTitle{
    /**
     *
     * @param title{string}
     * @param array{object[]}
     */
    constructor(title,array) {
        this._array = array;
        this._isMinToMax = false;
        this._title = title;
        this._previousTitle = '';
        this._arrayToReturn = [];
    }

    /**
     *
     * @param title{string}
     */
    setNewTitle(title){
        this._title = title;
    }

    /**
     *
     * @returns {object[]}
     */
    getSortedArray(){
        if(this._title === this._previousTitle){
            this._isMinToMax = !this._isMinToMax;
        }
        else{
            this._isMinToMax = true;
        }
        if(this._isMinToMax){
            this._arrayToReturn = [...this._array].sort((a,b) =>{
                return a[this._title] - b[this._title];
            })
        }
        if(!this._isMinToMax){
            this._arrayToReturn = [...this._array].sort((a,b) =>{
                return b[this._title]- a[this._title];
            })
        }
        this._previousTitle = this._title;
        return this._arrayToReturn;
    }

}

// const firstResult = new SortByTitle('FID',mockStations);
// console.log(firstResult.getSortedArray());
// firstResult.setNewTitle('ID');
// console.log(firstResult.getSortedArray());
