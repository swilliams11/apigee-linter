var grunt = require('grunt');
var xpath = require('xpath'),
        dom = require('xmldom').DOMParser;
var S = require('string');
//var self = require('./lib.js');

var exports = module.exports = {};

exports.myfunction = function() {
    return 5;
};

var convertRegexToString = function(regex){
	var temp = regex.toString();
	temp = S(temp).replaceAll('/','').replaceAll('.','').replaceAll('*','').s;
	return temp;
};

var replaceCharAt = function(index, char, mystring){
    var a = mystring.split('');
    a[index] = char;
    return a.join('');
};

var capitalize = function(value){
	var regex = /-[a-z]/;
	//var index = value.search(regex);
	var capitalizedString = value;
	while((index = capitalizedString.search(regex)) >= 0){
		var charc = capitalizedString.charAt(index+1);
		capitalizedString = replaceCharAt(index+1, S(charc).capitalize().s, capitalizedString);
	}
	return capitalizedString;	
};

exports.lint = function(value){
	var contains = grunt.config.get('apigee_linter.default_options.options.assign_message.assign_message.name_starts_with');
	if(value.search(contains) == -1){
		console.log("Warning:")
		console.log("name=" + value);
		console.log("pattern=" + contains);		
		var temp = S(value).dasherize().s;
		console.log(temp);
		temp = capitalize(temp);
		console.log( "recommend: " + convertRegexToString(contains) + temp);
		console.log("\n");
	}
	//console.log(grunt.config.get('apigee_linter.default_options.options.assign_message.assign_message.name_starts_with'));
};

var handleAssignMessage = function(content) {
    	//console.log("handleMessage: " + content);
        var doc = new dom().parseFromString(content);
        var nodes = xpath.select("/AssignMessage/@name", doc);
        //console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
        if(nodes[0] != null){
        	console.log(nodes[0].value);
        	exports.lint(nodes[0].value);	
        }        
    };

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
        	console.log("AssignMessage: " + filepath);
            handleAssignMessage(src);
            countOfFilesRead++;
        }
        //console.log(nodes[0]);
        //console.log("node: " + nodes[0].toString());      
        //console.log("**********************************************");
    });
    return countOfFilesRead;
};