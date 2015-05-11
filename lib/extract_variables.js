var grunt = require('grunt');
var xpath = require('xpath'),
    dom = require('xmldom').DOMParser;
var S = require('string');
var constants = require('./constants.js');
var lib = require('../lib/lib.js');
var nameStartsWithGlobal = grunt.config.get('apigee_extract_variables.lint.options.extract_variables.name_starts_with');
//Query param
var extract_variables_pattern_format = grunt.config.get('apigee_extract_variables.lint.options.pattern.format');
var extract_variables_uri_pattern_format = grunt.config.get('apigee_extract_variables.lint.options.uri_pattern.format');
//Header
var extract_variables_header_pattern_format = grunt.config.get('apigee_extract_variables.lint.options.header_pattern.format');
//form param
var extract_variables_form_param_pattern_format = grunt.config.get('apigee_extract_variables.lint.options.form_param_pattern.format');
//variable
var variable_name_format = grunt.config.get('apigee_extract_variables.lint.options.variable.format');
var variable_pattern_format = grunt.config.get('apigee_extract_variables.lint.options.variable_pattern.format');
//json payload
var json_payload_pattern_format = grunt.config.get('apigee_extract_variables.lint.options.json_payload_variable.format');
//xml payload
var xml_payload_pattern_format = grunt.config.get('apigee_extract_variables.lint.options.xml_payload_variable.format');

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
            //Query Param Pattern
            searchObject = exports.searchBuilder(src, constants.xPaths.extract_variables_queryparam_pattern, constants.xPaths.extract_variables_queryparam_pattern_text, extract_variables_pattern_format);
            exports.handlePattern(searchObject);
            //URI Pattern
            searchObject = exports.searchBuilder(src, constants.xPaths.extract_variables_uri_pattern, constants.xPaths.extract_variables_uri_pattern_text, extract_variables_uri_pattern_format);
            exports.handlePattern(searchObject);
            //Header
            searchObject = exports.searchBuilder(src, constants.xPaths.extract_variables_header_pattern, constants.xPaths.extract_variables_header_pattern_text, extract_variables_header_pattern_format);
            exports.handlePattern(searchObject);
            //form param
            searchObject = exports.searchBuilder(src, constants.xPaths.extract_variables_form_param_pattern, constants.xPaths.extract_variables_form_param_pattern_text, extract_variables_form_param_pattern_format);
            exports.handlePattern(searchObject);
            //variable name element
            searchObject = exports.searchBuilder(src, grunt.config.get('apigee_extract_variables.lint.options.variable_pattern.pattern_xpath'), grunt.config.get('apigee_extract_variables.lint.options.variable_pattern.text_xpath'), variable_pattern_format);
            exports.handlePattern(searchObject);    
            //variable_name_format = grunt.config.get('apigee_extract_variables.lint.options.variable.format');
            //variable pattern param
            searchObject = exports.searchBuilder(src, grunt.config.get('apigee_extract_variables.lint.options.variable.pattern_xpath'), grunt.config.get('apigee_extract_variables.lint.options.variable.name_xpath'), variable_name_format);
            exports.handleAttribute(searchObject);
            //JSONPath
            searchObject = exports.searchBuilder(src
                , grunt.config.get('apigee_extract_variables.lint.options.json_payload_variable.pattern_xpath')
                , grunt.config.get('apigee_extract_variables.lint.options.json_payload_variable.name_xpath')
                , json_payload_pattern_format);
            exports.handleAttribute(searchObject);            
            //XMLPath
            searchObject = exports.searchBuilder(src
                , grunt.config.get('apigee_extract_variables.lint.options.xml_payload_variable.pattern_xpath')
                , grunt.config.get('apigee_extract_variables.lint.options.xml_payload_variable.name_xpath')
                , json_payload_pattern_format);
            exports.handleAttribute(searchObject);            
            //handleAssignToElement(src, filepath);
            //handleAssignVariable(src, filepath);
            countOfFilesRead++;
        }
    });
    return countOfFilesRead;
};
/*
builds the search object that is passed into all the lint functions.
src - xml content
xpathParent - the xpath that contains the text we are searching for 
(e.g. 'extract_variables_uri_pattern':'/ExtractVariables/URI/Pattern', )
xpathData - the xpath for the text that we need to extract. 
(e.g. 'extract_variables_uri_pattern_format':'/ExtractVariables/URI/Pattern/text()')
patternFormat - the format of the conversion (i.e. dash, camelCase)
*/
exports.searchBuilder = function(src, xpathParent, xpathData, patternFormat) {
    grunt.log.debug("searchBuilder()");
    var obj = {};
    obj.content = src;
    obj.xpathParent = xpathParent;
    obj.xpathData = xpathData;
    obj.patternFormat = patternFormat;
    grunt.log.debug("Object Returned:\n" + "content: " + obj.content + "\nxpathParent: " + obj.xpathParent + "\nxpathData: " + obj.xpathData + "\npatternFormat: " + obj.patternFormat);
    return obj;
};
/*
handles the <Pattern> element.
lint all the pattern elements.

*/
exports.handlePattern = function(searchObject) {
    grunt.log.debug("handlePattern()");
    grunt.log.debug("parsing the xml...");
    var nodes = lib.parseXML(searchObject.content, searchObject.xpathData);
    var nodesPattern = lib.parseXML(searchObject.content, searchObject.xpathParent);
    grunt.log.debug("\nfound nodes...");
    grunt.log.debug(nodes);
    grunt.log.debug(nodesPattern);
    grunt.log.debug('\nnumber of matches found=' + nodes.length);
    for (i = 0; i < nodes.length; i++) {
        searchObject.nodeFound = exports.removeCurlyBraces(nodes[i]);
        grunt.log.debug('node found set to ' + searchObject.nodeFound);
        searchObject.nodeFoundLocation = nodesPattern[i];
        grunt.log.debug('node found location ' + searchObject.nodeFoundLocation);
        grunt.log.debug('processing node : ' + nodes[i]);
        //textWithoutCurlyBraces = exports.removeCurlyBraces(nodes[i]);
        //lib.lintLowerCase(nodes[i], xpathChildPattern, extract_variables_pattern_format);
        SearchObject = lib.lintLowerCaseObject(searchObject);
        lib.reportLintResultObject(searchObject);
    }
};
/*
Removes the curly braces from the string.
dasherize works with the curly braces included so this is not necessary.
*/
exports.removeCurlyBraces = function(text) {
    text = String(text);
    text = text.replace('{','');
    text = text.replace('}','');
    //return S(text).between('{', '}').s;
    return text;
};
/*
handle attribute within the element;
The attribute seems to be parsed using a stack.
if the file has name, name2 and name3 as attributes, then
it will list in reverse order, name3, name2 and name.
*/
exports.handleAttribute = function(searchObject){
    grunt.log.debug("handleAttribute()");
    grunt.log.debug("parsing the xml...");
    var nodes = lib.parseXML(searchObject.content, searchObject.xpathData);
    var nodesPattern = lib.parseXML(searchObject.content, searchObject.xpathParent);
    grunt.log.debug("\nfound nodes...");
    grunt.log.debug("nodes: " + nodes);
    grunt.log.debug("nodesPattern: " + nodesPattern);
    grunt.log.debug('\nnumber of matches found=' + nodes.length);
    for (i = 0, z = nodes.length - 1; i < nodes.length; i++, z--) {        
        searchObject.nodeFound = exports.parseAttribute(nodes[z]);
        grunt.log.debug('node found set to ' + searchObject.nodeFound);
        searchObject.nodeFoundLocation = nodesPattern[i];
        grunt.log.debug('node found location : ' + nodesPattern[i]);
        grunt.log.debug('processing node : ' + nodes[z]);
        //textWithoutCurlyBraces = exports.removeCurlyBraces(nodes[i]);
        //lib.lintLowerCase(nodes[i], xpathChildPattern, extract_variables_pattern_format);
        searchObject = lib.lintLowerCaseObject(searchObject);
        lib.reportLintResultObject(searchObject);
    }
};
exports.handleNestedAttribute = function(searchObject){
    grunt.log.debug("handleNestedAttribute()");

};
/*
Parse the name attribute values
*/
exports.parseAttribute = function(text){
    temp = String(text);
    temp = temp.split('=');
    temp = temp[1].replace(/\"/g,'');
    return temp;
};
