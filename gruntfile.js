'use strict';

module.exports = function (grunt) {
  // Project Configuration
  grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Watch files and reload browser if a file changes.
        watch: {
          jade: {
            files: ['app/views/**'],
            options: {
              livereload: true
            }
          },
          html: {
            files: ['public/views/**'],
            options: {
              livereload: true
            }
          },
          js: {
            files: ['public/js/**'],
            options: {
              livereload: true
            },
            tasks: ['jshint']
          },
          css: {
            files: ['public/sass/**'],
            tasks: ['compass'],
            options: {
              livereload: true,
              force: true
            }
          }
        },
        jshint: {
          all: {
            src: ['gruntfile.js', 'public/js/**/*.js', 'test/**/*.js', 'app/**/*.js', 'server.js'],
            options: {
              jshintrc: '.jshintrc',
              ignores: ['public/lib/*']
            }
          }
        },
        //        compass: { //Task
        //          dist: { //Target
        //            options: { //Target options
        //              sassDir: 'public/sass',
        //              cssDir: 'public/css',
        //              environment: 'production'
        //            }
        //          },
        //          dev: { //Another target
        //            options: {
        //              sassDir: 'public/sass',
        //              cssDir: 'public/css'
        //            }
        //          }
        //        },
        // Watch the server and restart it if needed.
        nodemon: {
          dev: {
            options: {
              file: 'server.js',
              args: [],
              ignoredFiles: ['LICENSE', 'README.md', 'node_modules/**', '.DS_Store', '.idea'],
              watchedExtensions: ['js'],
              watchedFolders: ['app', 'config'],
              debug: true,
              delayTime: 1,
              env: {
                PORT: 9000
              },
              cwd: __dirname
            }
          },
          exec: {
            options: {
              exec: 'less'
            }
          }
        },
        concurrent: {
          target: {
            tasks: ['nodemon', 'watch'],
            options: {
              logConcurrentOutput: true
            }
          }
        },
        karma: {
          unit: {
            configFile: 'karma.conf.js',
            singleRun: true
          }
        },
        uglify: {
          options: {

          },
          build: {

          }
        }
      }
      // TODO(vjames19): Add task to build minify and deploy.
  );

  // Load NPM tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  // Register tasks.
  grunt.registerTask('default', ['jshint', 'concurrent:target']);

  grunt.registerTask('lint', ['jshint']);

  grunt.registerTask('test', ['jshint', 'karma']);
};
