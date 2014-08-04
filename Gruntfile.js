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
                src: ['app/js/client/vendor/**/*.js','app/js/client/build/**/*.js', 'app/js/client/kickoff.js'],
                dest: 'app/js/main-min.js',
            }
        },
        watch: {
            concatJS: {
                options: {
                    livereload: true
                },
                files: [
                    'app/js/client/*.js',
                    'app/js/client/**/*.js'
                ],
                tasks: ['concat'],
            },
            compileJSX: {
              files: [
                'app/js/client/jsx/**/*.jsx'
              ],
              tasks: ['react', 'concat']
            }
        },
        react: {
         files: {
            expand: true,
            cwd: 'app/js/client/jsx/',
            src: '**/*.jsx',
            dest: 'app/js/client/build',
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
