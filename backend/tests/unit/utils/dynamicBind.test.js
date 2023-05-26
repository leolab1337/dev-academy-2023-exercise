const assert = require('chai').assert;
const {dynamicBind} = require("../../../src/utils/dynamicBind");

describe('dynamicBind', () => {
    it('should bind the function to the specified context', () => {
        const obj1 = {
            name: 'Object 1',
            greet: function() {
                return `Hello, ${this.name}!`;
            }
        };

        const obj2 = {
            name: 'Object 2'
        };

        const boundGreet = dynamicBind(obj1, obj1.greet);
        assert.strictEqual(boundGreet(), 'Hello, Object 1!');

        const boundGreet2 = dynamicBind(obj2, obj1.greet);
        assert.strictEqual(boundGreet2(), 'Hello, Object 2!');
    });

    it('should return a curried function', () => {
        const obj = {
            name: 'Object',
            greet: function(greeting) {
                return `${greeting}, ${this.name}!`;
            }
        };

        const boundGreet = dynamicBind(obj)(obj.greet);
        assert.strictEqual(boundGreet('Hola'), 'Hola, Object!');
        assert.strictEqual(boundGreet('Bonjour'), 'Bonjour, Object!');
    });

});
