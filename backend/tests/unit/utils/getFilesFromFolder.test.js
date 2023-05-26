const assert = require('chai').assert;
const sinon = require('sinon');
const fs = require('fs');

const {getFilesFromFolder} = require("../../../src/utils/getFilesFromFolder");


describe('getFilesFromFolder', () => {
    let readdirSyncStub;

    before(() => {
        readdirSyncStub = sinon.stub();
        readdirSyncStub.returns(['file1.txt', 'file2.txt', 'file3.txt']);
        sinon.stub(fs, 'readdirSync').callsFake(readdirSyncStub);
    });

    after(() => {
        fs.readdirSync.restore();
    });

    it('should return an array of file paths from the specified folder', () => {
        const folderPath = './test-folder';
        const expectedFilePaths = [
            './test-folder/file1.txt',
            './test-folder/file2.txt',
            './test-folder/file3.txt'
        ];

        const actualFilePaths = getFilesFromFolder(folderPath);

        assert.isArray(actualFilePaths);
        assert.sameMembers(actualFilePaths, expectedFilePaths);
    });

    it('should throw an error if there is an error reading the folder or accessing its files', () => {
        readdirSyncStub.throws(new Error('Error reading folder'));

        assert.throws(() => {
            getFilesFromFolder('./test-folder');
        }, Error);
    });
});
