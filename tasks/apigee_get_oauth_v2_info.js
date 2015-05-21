/*
 * grunt-apigee-linter
 * https://github.com/swilliams11/apigee-linter
 *
 * Copyright (c) 2015 Sean Williams
 * Licensed under the MIT license.
 */
'use strict';
var apigee = require('../lib/oauth.js');
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
    grunt.registerMultiTask('get_oauth_v2_info', 'Apigee Get OAuth v2 Info linter', function() {
        // Lint specified files.
        apigee.getOauthv2Info(grunt.task.current.filesSrc);
    });    
};