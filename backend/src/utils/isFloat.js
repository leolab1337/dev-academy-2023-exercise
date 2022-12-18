const isStringNumberFloat = (n) =>{
   if(typeof(n) === "string"){
       return  n.includes('.');
   }
   else{
       return false;
   }

}

const isNumberFloat = (n) => Number(n) === n && n % 1 !== 0;

module.exports = {
    isStringNumberFloat,
    isNumberFloat
}
