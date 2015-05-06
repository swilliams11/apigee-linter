'use strict';
var grunt = require('grunt');
var apigee = require('../lib/lib.js');
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/
exports.apigee_linter = {
  
    setUp: function(done) {
        // setup here if necessary
        //console.log(apigee.myfunction());
        done();
    },
    default_options: function(test) {
        test.expect(1);
        //grunt.task.run('apigee_linter');
        var count = apigee.assignMessage(grunt.file.expand('test/apiproxy/policies/*.xml'));
        //console.log(grunt.config.get('nodeunit.files.src'));
        
        test.equal(count, 3, 'Number of AssignMessage policies found.');
        test.done();
    },
    custom_options: function(test) {
        test.expect(1);
        
        test.equal(3, 3, 'should describe what the custom option(s) behavior is.');
        test.done();
    },
};