const chai = require('chai');
const addIdToPath = require("../../../src/utils/addIdToPath");
const expect = chai.expect;

describe('addIdToPath', () => {
    it('should add the ID to the path', () => {
        const basePath = '/users';
        const userId = '12345';
        const expectedPath = '/users/12345';
        const newPath = addIdToPath(basePath, userId);
        expect(newPath).to.equal(expectedPath);
    });

    it('should handle paths with trailing slashes', () => {
        const basePath = '/users/';
        const userId = '12345';
        const expectedPath = '/users/12345';
        const newPath = addIdToPath(basePath, userId);
        expect(newPath).to.equal(expectedPath);
    });

    it('should handle empty paths', () => {
        const basePath = '';
        const userId = '12345';
        const expectedPath = '/12345';
        const newPath = addIdToPath(basePath, userId);
        expect(newPath).to.equal(expectedPath);
    });


    it('should handle paths with multiple segments', () => {
        const basePath = '/users/12345/profile';
        const userId = '67890';
        const expectedPath = '/users/12345/profile/67890';
        const newPath = addIdToPath(basePath, userId);
        expect(newPath).to.equal(expectedPath);
    });

    it('should handle IDs with special characters', () => {
        const basePath = '/products';
        const userId = 'a!b@c#d$e%f^';
        const expectedPath = '/products/a!b@c#d$e%f^';
        const newPath = addIdToPath(basePath, userId);
        expect(newPath).to.equal(expectedPath);
    });

    it('should handle numeric IDs', () => {
        const basePath = '/items';
        const userId = '123';
        const expectedPath = '/items/123';
        const newPath = addIdToPath(basePath, userId);
        expect(newPath).to.equal(expectedPath);
    });

    it('should handle empty ID', () => {
        const basePath = '/users';
        const userId = '';
        const expectedPath = '/users/';
        const newPath = addIdToPath(basePath, userId);
        expect(newPath).to.equal(expectedPath);
    });
});
