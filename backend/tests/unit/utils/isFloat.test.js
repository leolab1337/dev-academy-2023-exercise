const assert = require('chai').assert;
const {isStringNumberFloat,isNumberFloat} = require("../../../src/utils/isFloat");

describe('isStringNumberFloat', () => {
    it('should return true for string representing a float', () => {
        assert.isTrue(isStringNumberFloat('3.14'));
        assert.isTrue(isStringNumberFloat('0.5'));
        assert.isTrue(isStringNumberFloat('-2.718'));
    });

    it('should return false for string representing an integer', () => {
        assert.isFalse(isStringNumberFloat('10'));
        assert.isFalse(isStringNumberFloat('0'));
        assert.isFalse(isStringNumberFloat('-5'));
    });

    it('should return false for non-string values', () => {
        assert.isFalse(isStringNumberFloat(3.14));
        assert.isFalse(isStringNumberFloat(10));
        assert.isFalse(isStringNumberFloat(null));
        assert.isFalse(isStringNumberFloat(undefined));
    });
});

describe('isNumberFloat', () => {
    it('should return true for float numbers', () => {
        assert.isTrue(isNumberFloat(3.14));
        assert.isTrue(isNumberFloat(0.5));
        assert.isTrue(isNumberFloat(-2.718));
    });

    it('should return false for integer numbers', () => {
        assert.isFalse(isNumberFloat(10));
        assert.isFalse(isNumberFloat(0));
        assert.isFalse(isNumberFloat(-5));
    });

    it('should return false for non-number values', () => {
        assert.isFalse(isNumberFloat('3.14'));
        assert.isFalse(isNumberFloat('10'));
        assert.isFalse(isNumberFloat(null));
        assert.isFalse(isNumberFloat(undefined));
    });
});
