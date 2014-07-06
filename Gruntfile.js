module.exports = function(grunt) {
 
    // Project configuration.
    grunt.initConfig({
 
        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),
 
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ',
 
        // Task configuration.
        concat: {
            dist: {
                src: ['app/js/vendor/**/*.js','app/js/components/**/*.js'],
                dest: 'app/js/main-min.js',
            }
        },
        watch: {
            concatJS: {
                options: {
                    livereload: true
                },
                files: [
                    'app/js/*/**/*.js'
                ],
                tasks: ['concat'],
            },
            compileJSX: {
              files: [
                'app/jsx/**/*.jsx'
              ],
              tasks: ['react', 'concat']
            }
        },
        react: {
         files: {
            expand: true,
            cwd: 'app/jsx/',
            src: '**/*.jsx',
            dest: 'app/js',
            ext: '.js'
         } 
        }
    });
 
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-react');
 
    // Default task.
    grunt.registerTask('default', ['watch']);
 
};
