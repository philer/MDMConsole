module.exports = function(grunt) {
  
  "use strict";
  
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    jsFiles: [
      'js/console.js',
      'js/mdm-console.js',
      'js/theme.js',
    ],
    
    jshint: {
      options: {
        strict: true,    // require all functions (but not global) to be strict mode
        '-W014': true,   // "Bad line break before '+'."
        '-W084': true,   // if (a = b)
        '-W093': true,   // return a = b;
        "-W086": true,   // allow switch-case fall-through
        validthis: true, // $(this) -> "Possible strict mode violation"
      },
      all: [
        'Gruntfile.js',
        '<%= jsFiles %>',
      ],
    },
    
    watch: {
      scripts: {
        files: [
          'Gruntfile.js',
          '<%= jsFiles %>',
        ],
        tasks: ['jshint']
      }
    }
    
  });
  
  grunt.registerTask('default', 'jshint');
};