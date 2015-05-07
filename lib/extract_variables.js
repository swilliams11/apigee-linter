var grunt = require('grunt');
var xpath = require('xpath'),
    dom = require('xmldom').DOMParser;
var S = require('string');
var constants = require('./constants.js');
var lib = require('../lib/lib.js');
//var self = require('./lib.js');
var nameStartsWithGlobal = grunt.config.get('apigee_extract_variables.lint.options.extract_variables.name_starts_with');

var SEARCH_FOR_VALUE = constants.EXTRACT_VARIABLES;
var TITLE = constants.EXTRACT_VARIABLES;
var exports = module.exports = {};

/*
This functin handles all the AssignMessage Policies.
*/
exports.extractVariables = function(files) {
	grunt.log.debug("extractVariables()");
    //var files = this.filesSrc;
    //var files = grunt.task.current.filesSrc;
    var countOfFilesRead = 0;
    files.forEach(function(filepath) {
        var src = grunt.file.read(filepath);
        if (src.search(SEARCH_FOR_VALUE) >= 0) {
        	grunt.log.writeln("*****" + TITLE + " " + filepath + " *****");
        	lib.handleFileName2(filepath, nameStartsWithGlobal);
            lib.handleFileName(src, filepath, nameStartsWithGlobal, constants.xPaths.extract_variables_name);

            //handleAssignToElement(src, filepath);
            //handleAssignVariable(src, filepath);
            countOfFilesRead++;
        }
    });
    return countOfFilesRead;
};
