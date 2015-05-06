/*
 * grunt-apigee-linter
 * https://github.com/swilliams11/apigee-linter
 *
 * Copyright (c) 2015 Sean Williams
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    apigee_linter: {
      default_options: {
        options: {
          assign_message: {
            assign_message: {
              name: /-+/,
              name_starts_with: /Assign-Message.*/,
            }
          }
        },
        files: {
          'src': ['test/apiproxy/policies/*.xml']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
      
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'apigee_linter', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint','test']);
  grunt.registerTask('apigee-lint', ['jshint','apigee_linter']);

};
