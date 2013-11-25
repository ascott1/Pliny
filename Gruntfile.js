/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
      ' Licensed under the <%= pkg.license %> License */\n',
    // Task configuration.
    sass: {
      dist: {
        options: {
          style: 'compressed',
          banner: '<%= banner %>'
        },
        files: {
          'assets/css/main.css': 'assets/sass/main.scss'
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['assets/js/main.js'], // be sure to add all of you JS src files here
        dest: 'assets/js/concat.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'assets/js/main.min.js'
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass'],
      },
      js: {
        files: 'assets/js/*.js',
        tasks: ['concat', 'uglify'],
      },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['sass', 'concat', 'uglify']);

};
