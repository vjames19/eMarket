'use strict';

module.exports = function (grunt) {
  // Project Configuration

  var uglyFiles = function (srcDir) {
    var results = {};
    grunt.file.expand(srcDir).forEach(function (file) {
      results[file.split('.')[0] + '.min.js'] = [file];
    });
    return results;
  };

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
        compass: {
          dist: {
            options: {
              sassDir: 'public/sass',
              cssDir: 'public/css',
              imagesDir: 'public/img',
              javascriptsDir: 'public/js',
              relativeAssets: false,
              environment: 'production'
            }
          },
          dev: {
            options: {
              sassDir: 'public/sass',
              cssDir: 'public/css',
              imagesDir: 'public/img',
              javascriptsDir: 'public/js',
              relativeAssets: false,
              environment: 'development'
            }
          }
        },
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
        open: {
          server: {
            path: 'http://localhost:<%= nodemon.dev.options.env.PORT %>/'
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
            banner: '/* Built on <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
            mangle: true
          },
          target: {
            files: uglyFiles('public/js/**/*.js')
          }
        }
      }
      // TODO : Add task to deploy in different environments (production, development).
  );


  // Load NPM tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  // Register tasks.
  grunt.registerTask('default', ['jshint', 'open', 'concurrent:target']);

  grunt.registerTask('minify', ['uglify']);

  grunt.registerTask('lint', ['jshint']);

  grunt.registerTask('test', ['jshint', 'karma']);
};
