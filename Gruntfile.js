module.exports = function (grunt) {
    require('jit-grunt')(grunt);
    grunt.loadNpmTasks('grunt-stripcomments');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        comments: {
            js: {
                options: {
                    singleline: true,
                    multiline: true
                },
                src: [ 'src/*.js' ]
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';\n',
                    sourceMap: true
                },
                files: [
                    {
                        src: [
                            'src/*.js', 'src/Visualizers/*.js'
                        ],
                        dest: 'js/dist/audiovis.js'
                    }
                ]
            }
        },
        watch: {
            js: {
                files: [
                    'src/*.js', 'src/Visualizers/*.js'
                ],
                tasks: ['comments','concat']
            }
        }
    });

    grunt.registerTask('default', ['comments','concat']);
};
