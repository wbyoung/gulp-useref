/* jshint node: true */
/* global describe, it */

var should = require('should');
var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var useref = require('../index');

function getFile(filePath) {
    return new gutil.File({
        path:     filePath,
        base:     path.dirname(filePath),
        contents: fs.readFileSync(filePath)
    });
}

function getFixture(filePath) {
    return getFile(path.join('test', 'fixtures', filePath));
}

function getExpected(filePath) {
    return getFile(path.join('test', 'expected', filePath));
}

function compare(name, expectedName, done) {
    var stream = useref();

    stream.on('data', function(newFile) {
        if (path.basename(newFile.path) === name) {
            should(String(getExpected(expectedName).contents)).eql(String(newFile.contents));
        }
    });

    stream.on('end', function() {
        done();
    });

    stream.write(getFixture(name));

    stream.end();
}

describe('gulp-useref', function() {
    it('file should pass through', function(done) {
        var a = 0;

        var fakeFile = new gutil.File({
            path: './test/fixture/file.js',
            cwd: './test/',
            base: './test/fixture/',
            contents: new Buffer('wadup();')
        });

        var stream = useref();
        stream.on('data', function(newFile){
            should.exist(newFile);
            should.exist(newFile.path);
            should.exist(newFile.relative);
            should.exist(newFile.contents);
            newFile.path.should.equal('./test/fixture/file.js');
            newFile.relative.should.equal('file.js');
            ++a;
        });

        stream.once('end', function () {
            a.should.equal(1);
            done();
        });

        stream.write(fakeFile);
        stream.end();
    });

    it('should replace reference in css block and return replaced files', function(done) {
        compare('01.html', '01.html', done);
    });


    it('should replace reference in js block and return replaced files', function(done) {
        compare('02.html', '02.html', done);
    });

    it('should handle comments and whitespace in blocks', function(done) {
        compare('03.html', '03.html', done);
    });

    it('should handle multiple blocks', function(done) {
        compare('04.html', '04.html', done);
    });
});