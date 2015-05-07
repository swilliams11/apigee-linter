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
            all: ['Gruntfile.js', 'tasks/*.js', '<%= nodeunit.tests %>'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },
        // Configuration to be run (and then tested).
        apigee_assign_message: {
            lint: {
                options: {
                    assign_message: {
                        assign_message: {
                            name: 'dash',
                            name_starts_with: /Assign-Message.*/,
                        },
                        assign_to: {
                            text: 'dash'
                        },
                        assign_variable: {
                            name: {
                                text: 'dash'
                            }
                        }
                    }
                },
                files: {
                    'src': ['test/apiproxy/policies/*.xml']
                }
            }
        },
        //configuration for oauthv2 policy
        apigee_oauth: {
            lint: {
                options: {
                    oauthv2: {
                        name: 'dash',
                        name_starts_with: /OAuthv2.*/,
                    },
                },
                files: {
                    'src': ['test/apiproxy/policies/*.xml']
                }
            }
        },
        //configuration for ExtractVariables policy
        apigee_extract_variables: {
            lint: {
                options: {
                    extract_variables: {
                        name: 'dash',
                        name_starts_with: /Extract-Variables.*/,
                    },
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
    grunt.registerTask('test', ['clean', 'apigee_assign_message', 'apigee_oauth', 'nodeunit']);
    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);
    grunt.registerTask('apigee-lint', ['jshint', 'apigee_assign_message', 'apigee_oauth', 'apigee_extract_variables']);
};