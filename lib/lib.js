var grunt = require('grunt');
var xpath = require('xpath'),
        dom = require('xmldom').DOMParser;

var exports = module.exports = {};

exports.myfunction = function() {
    return 5;
};

exports.assignMessage = function() {
    //var files = this.filesSrc;
    var files = grunt.task.current.filesSrc;
    var countOfFilesRead = 0;
    var handleAssignMessage = function(content) {
    	//console.log("handleMessage: " + content);
        var doc = new dom().parseFromString(content);
        var nodes = xpath.select("/AssignMessage/@name", doc);
        //console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
        if(nodes[0] != null){
        	console.log(nodes[0].value);	
        }        
    };

    files.forEach(function(filepath) {
        var src = grunt.file.read(filepath);
        //console.log(src);
        //console.log(filepath);
        //console.log(src);
        if (src.search("AssignMessage") >= 0) {
        	//console.log("AssignMessage: " + filepath);
            handleAssignMessage(src);
            countOfFilesRead++;
        }
        //console.log(nodes[0]);
        //console.log("node: " + nodes[0].toString());      
        //console.log("**********************************************");
    });
    return countOfFilesRead;
};