module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['resources/bootstrap/js/*.js', 'resources/dist/js/*.js', 'resources/plugins/iCheck/icheck.min.js'],
        tasks: ['jshint:client', 'jscs:client']
      },
      css: {
        files: ['resources/bootstrap/css/*.css', 'resources/dist/css/*.css', 'resources/plugins/iCheck/square/blue.css']
      },
      express: {
        files: ['server/*.js', 'server/*/*.js', 'server/*/*/*.js'],
        tasks: ['jshint:server', 'jscs:server', 'express:dev'],
        options: {
          spawn: false
        }
      },
      handlebars: {
        files: [
          'views/layouts/*.handlebars',
          'views/pages/*.handlebars',
          'views/pages/*/*.handlebars'
        ]
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: true
      },
      client: {
        src: ['resources/dist/js/*.js']
      },
      server: {
        src: ['server/*.js', 'server/*/*.js', 'server/*/*/*.js']
      },
      mocha: {
        src: ['test/model/*.js', 'test/controller/*.js', 'test/config/*.js']
      }
    },
    jscs: {
      client: {
        src: ['resources/scripts/*.js']
      },
      server: {
        src: ['server/*.js', 'server/*/*.js', 'server/*/*/*.js']
      },
      mocha: {
        src: ['test/model/*.js', 'test/controller/*.js', 'test/config/*.js']
      }
    },
    open: {
      express: {
        path: 'http://localhost:3000'
      }
    },
    express: {
      dev: {
        options: {
          script: 'server/server_webservice.js'
        }
      }
    },
    mochaTest: {
      test: {
        src: ['test/*//*.js']
      }
    }
  });

  grunt.registerTask('default', 'serve');
  grunt.registerTask('serve', ['express:dev', 'open:express', 'watch']);
  grunt.registerTask('mocha', 'mochaTest');
};
