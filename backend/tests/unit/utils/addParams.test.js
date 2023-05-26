const chai = require('chai');
const addParams = require("../../../src/utils/addParams");
const expect = chai.expect;

describe('addParams', () => {
    it('should construct the parameter string correctly', () => {
        const baseString = 'https://example.com/api';
        const params = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3'
        };
        const expectedResult = 'https://example.com/api?key1=value1&key2=value2&key3=value3';

        const result = addParams(baseString, params);

        expect(result).to.equal(expectedResult);
    });

    it('should handle an empty params object', () => {
        const baseString = 'https://example.com/api';
        const params = {};
        const expectedResult = 'https://example.com/api';

        const result = addParams(baseString, params);

        expect(result).to.equal(expectedResult);
    });

    it('should handle a baseString without any existing query parameters', () => {
        const baseString = 'https://example.com/api';
        const params = {
            key1: 'value1',
            key2: 'value2'
        };
        const expectedResult = 'https://example.com/api?key1=value1&key2=value2';

        const result = addParams(baseString, params);

        expect(result).to.equal(expectedResult);
    });

    it('should handle a baseString with existing query parameters', () => {
        const baseString = 'https://example.com/api?existing=param';
        const params = {
            key1: 'value1',
            key2: 'value2'
        };
        const expectedResult = 'https://example.com/api?existing=param&key1=value1&key2=value2';

        const result = addParams(baseString, params);

        expect(result).to.equal(expectedResult);
    });
});
