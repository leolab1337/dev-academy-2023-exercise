const chai = require('chai');
const {curry} = require("../../../src/utils/curry");
const expect = chai.expect;

describe('curry', () => {


    it('should return a curried function', () => {
        const add = (a, b) => a + b;
        const curriedAdd = curry(add);

        expect(curriedAdd).to.be.a('function');
        expect(curriedAdd(2)).to.be.a('function');
        expect(curriedAdd(2)(3)).to.equal(5);
    });

    it('should curry a function with multiple arguments', () => {
        const sum = (a, b, c) => a + b + c;
        const curriedSum = curry(sum);

        const result = curriedSum(1)(2)(3);
        expect(result).to.equal(6);
    });

    it('should handle a function with no arguments', () => {
        const func = () => 'Hello, world!';
        const curriedFunc = curry(func);

        const result = curriedFunc();
        expect(result).to.equal('Hello, world!');
    });
});
