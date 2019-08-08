'use strict';

module.exports = function (grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    babel: {
      options: {
          sourceMap: false,
          presets: ["@babel/preset-env", "@babel/react"]
      },
      dist: {
        files: {
          'dist/app.js': 'src/app.js'
        }
      }
    },
    less: {
      dist: {
        files: {
          'style/css/style.min.css': [
            'style/less/*.less'
          ]
        },
        options: {
          compress: true,
          // LESS source map
          // To enable, set sourceMap to true and update sourceMapRootpath based on your install
          sourceMap: false,
          sourceMapFilename: 'style/css/style.min.css',
          sourceMapRootpath: '/'
        }
      },
      dev: {
        files: {
          'style/css/style.min.css': [
            'style/less/*.less'
          ]
        },
        options: {
          compress: false,
          // LESS source map
          // To enable, set sourceMap to true and update sourceMapRootpath based on your install
          sourceMap: true,
          sourceMapFilename: 'style/css/style.min.css',
          sourceMapRootpath: '/'
        }
      }
    },
    watch: {
      less: {
        files: [
          'style/less/*.less'
        ],
        tasks: ['less:dev']
      },
      html: {
        files: ['**/*.html'],
        tasks: []
      },
      css: {
        files: ['style/css/style.min.css'],
        tasks: []
      },
      js: {
        files: [
          'src/**/*.js',
          'ong/*.js',
          'dist/**/*.js'
        ],
        tasks: ['babel']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: true
        },
        files: [
        //  'dist/*'
        ]
      }
    },
    clean: {
      dist: [
        'style/css/style.min.css',
        'style/css/style.min.css.map',
        'dist/*'
      ]
    },
    connect: {
      server: {
        options: {
          livereload: true,
          base: '.',
          port: 9000
        }
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'less:dist',
    'babel'
  ]);

  grunt.registerTask('serve', [
    'default',
    'connect:server',
    'watch'
  ]);
};