var grunt = require('grunt');
var xpath = require('xpath'),
    dom = require('xmldom').DOMParser;
var constants = require('./constants.js');
var S = require('string');
//var self = require('./lib.js');
var nameStartsWithGlobal = grunt.config.get('apigee_assign_message.lint.options.assign_message.assign_message.name_starts_with');
var assign_to_format = grunt.config.get('apigee_assign_message.lint.options.assign_message.assign_to.text');
var assign_variable_name_format = grunt.config.get('apigee_assign_message.lint.options.assign_message.assign_variable.name.text');

var exports = module.exports = {};
exports.myfunction = function() {
    return 5;
};
var convertRegexToString = function(regex) {
    var temp = regex.toString();
    temp = S(temp).replaceAll('/', '').replaceAll('.', '').replaceAll('*', '').s;
    return temp;
};
/*
replace a char at a specific location
*/
var replaceCharAt = function(index, char, mystring) {
    var a = mystring.split('');
    a[index] = char;
    return a.join('');
};
var capitalize = function(value) {
    var regex = /-[a-z]/;
    //var index = value.search(regex);
    var capitalizedString = value;
    while ((index = capitalizedString.search(regex)) >= 0) {
        var charc = capitalizedString.charAt(index + 1);
        capitalizedString = replaceCharAt(index + 1, S(charc).capitalize().s, capitalizedString);
    }
    return capitalizedString;
};
var isValidLintValue = function(lintValue) {
    if (constants.validValues.indexOf(lintValue) == -1) {
        return false;
    } else {
        return true;
    }
};
exports.handleFileName2 = function(filepath, nameStartsWith) {
    grunt.log.debug("handleFileName2()");
    var extractedFileName = exports.extractFileName(filepath);
    grunt.log.debug("extracted file name=" + extractedFileName);
    exports.lint(extractedFileName, nameStartsWith, constants.constantNames.fileName);
};
exports.extractFileName = function(filepath) {
    return filepath.substring(filepath.lastIndexOf('/') + 1);
};
/*
 
 */
exports.handleFileName = function(content, filepath, nameStartsWith, myxpath) {
    grunt.log.debug("handleFileName()");
    //console.log("handleMessage: " + content);
    var doc = new dom().parseFromString(content);
    grunt.log.debug('content:' + content);
    grunt.log.debug('search for: ' + myxpath);
    var nodes = xpath.select(myxpath, doc);
    grunt.log.debug(nodes);
    //console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
    if (nodes[0] != null) {
        //console.log(nodes[0].value);
        exports.lint(nodes[0].value, nameStartsWith, constants.constantNames.nameElement);
        //exports.lint2(nodes[0].value, xPaths.assign_message_assign_variable_name, assign_variable_name_format);
    } else {
        grunt.log.writeln("file does not match: " + myxpath);
        grunt.log.error("searched value not found.");
    }
};
exports.lint = function(value, nameStartsWith, type) {
    grunt.log.debug("lint()");
    if (value.search(nameStartsWith) == -1) {
        grunt.log.debug(type + '"' + value + '"');
        //grunt.log.writeln("pattern=" + nameStartsWith);
        var temp = S(value).dasherize().s;
        //console.log(temp);
        temp = capitalize(temp);
        grunt.log.writeln('CHANGE ' + value + ' TO ' + convertRegexToString(nameStartsWith) + temp);
    }
    //console.log(grunt.config.get('apigee_assign_message.lint.options.assign_message.assign_message.name_starts_with'));
};
/*
This functin handles all the AssignMessage Policies.
*/
exports.assignMessage = function(files) {
    //var files = this.filesSrc;
    //var files = grunt.task.current.filesSrc;
    var countOfFilesRead = 0;
    files.forEach(function(filepath) {
        var src = grunt.file.read(filepath);
        //console.log(src);
        //console.log(filepath);
        //console.log(src);
        if (src.search("AssignMessage") >= 0) {
            grunt.log.writeln("*****AssignMessage: " + filepath + " *****");
            exports.handleFileName2(filepath, nameStartsWithGlobal);
            exports.handleFileName(src, filepath, nameStartsWithGlobal, constants.xPaths.assign_message_name);
            handleAssignToElement(src, filepath);
            handleAssignVariable(src, filepath);
            countOfFilesRead++;
        }
    });
    return countOfFilesRead;
};
var handleAssignToElement = function(content, filepath) {
    grunt.log.debug("handleAssignToElement()");
    var nodes = exports.parseXML(content, constants.xPaths.assign_message_assign_to);
    if (nodes == null || nodes == "") {
        return;
    }
    exports.lint2(nodes, constants.xPaths.assign_message_assign_to, assign_to_format);
};
var handleAssignVariable = function(content, filepath) {
    grunt.log.debug("handleAssignVarible()");
    var nodes = exports.parseXML(content, constants.xPaths.assign_message_assign_variable_name);
    if (nodes == null || nodes == "") {
        return;
    }
    exports.lint2(nodes, constants.xPaths.assign_message_assign_variable_name, assign_variable_name_format);
};
exports.parseXML = function(content, regexString) {
    grunt.log.debug("parseXML()");
    grunt.log.debug("regex : " + regexString);
    grunt.log.debug("Content:\n" + content);
    //console.log("handleMessage: " + content);
    var doc = new dom().parseFromString(content);
    var nodes = xpath.select(regexString, doc);
    grunt.log.debug("found string: " + nodes);
    return nodes;
};
exports.lint2 = function(text, regexString, format) {
    grunt.log.debug("lint2()");
    //var contains = grunt.config.get('apigee_assign_message.lint.options.assign_message.assign_to.text');
    grunt.log.debug("Grunt.js options: " + format);
    var suggestedValue;
    if (isValidLintValue(format)) {
        switch (format) {
            case 'dash':
                grunt.log.debug('calling dasherize(param:' + text + ')');
                suggestedValue = exports.dasherize(text);
                break;
            default:
                break;
        }
        exports.reportLintResult(regexString, format, text, suggestedValue);
    } else {
        grunt.log.debug('Invalid Lint value' + format);
        grunt.log.error('Invalid Lint value' + format);
    }
};
exports.lintLowerCase = function(text, regexString, format) {
    grunt.log.debug("lintLowerCase()");
    //var contains = grunt.config.get('apigee_assign_message.lint.options.assign_message.assign_to.text');
    grunt.log.debug("Grunt.js options: " + format);
    var suggestedValue;
    if (isValidLintValue(format)) {
        switch (format) {
            case 'dash':
                grunt.log.debug('calling dasherize(param:' + text + ')');
                suggestedValue = exports.dasherizeLowerCase(text);
                break;
            default:
                break;
        }
        exports.reportLintResult(regexString, format, text, suggestedValue);
    } else {
        grunt.log.debug('Invalid Lint value' + format);
        grunt.log.error('Invalid Lint value' + format);
    }
};
/*
This function replaces the one above eventually.
*/
exports.lintLowerCaseObject = function(searchObject) {
    grunt.log.debug("lintLowerCase()");
    //var contains = grunt.config.get('apigee_assign_message.lint.options.assign_message.assign_to.text');
    grunt.log.debug("Grunt.js options: " + searchObject.patternFormat);
    var suggestedValue;
    if (isValidLintValue(searchObject.patternFormat)) {
        switch (searchObject.patternFormat) {
            case 'dash':
                grunt.log.debug('calling dasherize(param:' + searchObject.nodeFound + ')');
                suggestedValue = exports.dasherizeLowerCase(searchObject.nodeFound);
                suggestedValue = suggestedValue.replace(/{-/g,'{');
                searchObject.suggestedValue = suggestedValue;
                break;
            default:
                break;
        }
        //exports.reportLintResult(searchObject.xpathData, searchObject.patternFormat, searchObject.nodeFound, suggestedValue);
        return searchObject;
    } else {
        //grunt.log.debug('Invalid Lint value' + format);
  		return searchObject;
        grunt.log.error('Invalid Lint value' + format);
    }
};
/*
converts the value to include dashes and 
capitalizes it as well.
e.g. thisIsATest => This-Is-A-Test
*/
exports.dasherize = function(value) {
    grunt.log.debug("dasherize()");
    if (value == null || value == "") {
        grunt.log.debug("NULL");
        return;
    }
    var temp = S(value).dasherize().s;
    grunt.log.debug('Dasherized string: ' + temp);
    grunt.log.debug('calling capitalize(param:' + temp + ')');
    return capitalize(temp);
};
/*
dasherizes the function and leaves it as lower case;
*/
exports.dasherizeLowerCase = function(value) {
    grunt.log.debug("dasherizeLowerCase()");
    if (value == null || value == "") {
        grunt.log.debug("NULL");
        return;
    }
    var temp = S(value).dasherize().s;
    grunt.log.debug('Dasherized string: ' + temp);
    if(temp.charAt(0) === '-'){
    	temp = replaceCharAt(0,'',temp);
    }
    return temp;
};
/*
 Print the results
 */
exports.reportLintResult = function(searchedFor, contains, value, suggestedValue) {
    grunt.log.debug("reportLintResult()");
    grunt.log.debug('linter value: ' + contains);
    //grunt.log.writeln('Suggestion:');
    grunt.log.debug('Searched for: ' + searchedFor);
    grunt.log.debug('Found : ' + value);
    grunt.log.debug("Format applied: " + contains);
    grunt.log.write('CHANGE ' + value);    
    grunt.log.write(" TO " + suggestedValue);
    grunt.log.writeln("\n");
};
/*
This function should replace the one above.  
*/
exports.reportLintResultObject = function(searchObject) {
    grunt.log.debug("reportLintResult()");
    grunt.log.debug('linter value: ' + searchObject.patternFormat);
    //grunt.log.writeln('Suggestion:');
    grunt.log.debug('Location pattern: ' + searchObject.xpathParent);
    //grunt.log.writeln(searchObject.nodeFoundLocation);
    grunt.log.debug('Searched for: ' + searchObject.xpathData);
    grunt.log.debug('Found: ' + searchObject.nodeFound);
    grunt.log.debug("Format applied: " + searchObject.patternFormat);
    grunt.log.write('CHANGE ' + searchObject.nodeFound);
    grunt.log.write(" TO " + searchObject.suggestedValue + ' : ' + searchObject.nodeFoundLocation + ' : ' + searchObject.xpathParent + '\n');
    //grunt.log.writeln("\n");
};