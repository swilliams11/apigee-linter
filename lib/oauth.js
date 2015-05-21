var grunt = require('grunt');
var xpath = require('xpath'),
    dom = require('xmldom').DOMParser;
var S = require('string');
var constants = require('./constants.js');
var lib = require('../lib/lib.js');
//var self = require('./lib.js');
var nameStartsWithGlobal = grunt.config.get('apigee_oauth.lint.options.oauth.name_starts_with');
var getOauthV2InfoNameStartsWithGlobal = grunt.config.get('get_oauth_v2_info.lint.options.name.name_starts_with');
var getOauthV2InfoNameXpath = grunt.config.get('get_oauth_v2_info.lint.options.name.name_xpath');
var getOauthV2InfoSearhFor =  grunt.config.get('get_oauth_v2_info.lint.options.search_for');
var SEARCH_FOR_VALUE = constants.OAUTHV2;

var TITLE = constants.OAUTHV2;
var exports = module.exports = {};

/*
This functin handles all the AssignMessage Policies.
*/
exports.oauthv2 = function(files) {
	grunt.log.debug("oauthv2()");
    //var files = this.filesSrc;
    //var files = grunt.task.current.filesSrc;
    var countOfFilesRead = 0;
    files.forEach(function(filepath) {
        var src = grunt.file.read(filepath);
        if (src.search(SEARCH_FOR_VALUE) >= 0) {
        	grunt.log.writeln("*****" + TITLE + " " + filepath + " *****");
        	lib.handleFileName2(filepath, nameStartsWithGlobal);
            lib.handleFileName(src, filepath, nameStartsWithGlobal, constants.xPaths.oauthv2_name);
            //handleAssignToElement(src, filepath);
            //handleAssignVariable(src, filepath);
            countOfFilesRead++;
        }
    });
    return countOfFilesRead;
};

/*

*/
exports.getOauthv2Info = function(files) {
    grunt.log.debug("getOauthv2Info()");
    //var files = this.filesSrc;
    //var files = grunt.task.current.filesSrc;
    var countOfFilesRead = 0;
    files.forEach(function(filepath) {
        var src = grunt.file.read(filepath);
        if (src.search(getOauthV2InfoSearhFor) >= 0) {
            grunt.log.writeln("*****" + TITLE + " " + filepath + " *****");
            lib.handleFileName2(filepath, getOauthV2InfoNameStartsWithGlobal);
            lib.handleFileName(src, filepath, getOauthV2InfoNameStartsWithGlobal, getOauthV2InfoNameXpath);
            //handleAssignToElement(src, filepath);
            //handleAssignVariable(src, filepath);
            countOfFilesRead++;
        }
    });
    return countOfFilesRead;
};
