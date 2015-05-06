/*
 * grunt-apigee-linter
 * https://github.com/swilliams11/apigee-linter
 *
 * Copyright (c) 2015 Sean Williams
 * Licensed under the MIT license.
 */
'use strict';
var apigee = require('../lib/lib.js');
module.exports = function(grunt) {
    /*
    var xpath = require('xpath'),
        dom = require('xmldom').DOMParser;
    var xml = "<book><title>Harry Potter</title></book>";
    var doc = new dom().parseFromString(xml);
    var nodes = xpath.select("//title", doc);
    console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
    console.log("node: " + nodes[0].toString());
    */
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('apigee_linter', 'Apigee linter', function() {
        // Lint specified files.
        apigee.assignMessage();
        // Write the destination file.
        //grunt.file.write(f.dest, src);
        // Print a success message.
        //grunt.log.writeln('File "' + f.dest + '" created.');
    });    
};