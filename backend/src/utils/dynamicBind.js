const {curry} = require("./curry");
/**
 Binds a function to a specific context dynamically.
 @param {Object} context - The context to bind the function to.
 @param {Function} fn - The function to bind.
 @returns {Function} - The bound function.
 */

const dynamicBind = curry((context,fn ) => {
    return fn.bind(context);
});


module.exports = {
    dynamicBind
};