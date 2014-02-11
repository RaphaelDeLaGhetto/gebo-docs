'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                   '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                   '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                   '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                   ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        nodeunit: {
            files: ['test/**/*.js', '!test/docs/**']
        },
//        jshint: {
//            options: {
//                jshintrc: '.jshintrc'
//            },
//            gruntfile: {
//                src: 'Gruntfile.js'
//            },
//            apps: {
//                src: ['app/**/*.js']
//            },
//            config: {
//                src: ['config/**/*.js']
//            },
//            lib: {
//                src: ['lib/**/*.js']
//            },
//            routes: {
//                src: ['routes/**/*.js']
//            },
////            test: {
////                src: ['test/**/*.js']
////            },
//        },
//        watch: {
//            gruntfile: {
//                files: '<%= jshint.gruntfile.src %>',
//                tasks: ['jshint:gruntfile']
//            },
//            lib: {
//                files: '<%= jshint.lib.src %>',
//                tasks: ['jshint:lib', 'nodeunit']
//            },
//            test: {
//                files: '<%= jshint.test.src %>',
//                tasks: ['jshint:test', 'nodeunit']
//            },
//        },
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
//    grunt.loadNpmTasks('grunt-contrib-jshint');
//    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    //grunt.registerTask('default', ['jshint', 'nodeunit']);
    grunt.registerTask('default', ['nodeunit']);

  };

