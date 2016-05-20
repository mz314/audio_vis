var
        src_files = [
            'src/*.js', 'src/Visualizers/*.js'
        ],
        default_tasks = [
            'jshint', 'comments', 'concat'
        ]
        ;

module.exports = function (grunt) {
    require('jit-grunt')(grunt);
    grunt.loadNpmTasks('grunt-stripcomments');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        comments: {
            js: {
                options: {
                    singleline: true,
                    multiline: true
                },
                src: src_files
            }
        },
        jshint: {
            files: {
                src: src_files
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
                        src: src_files,
                        dest: 'js/dist/audiovis.js'
                    }
                ]
            }
        },
        watch: {
            js: {
                files: src_files,
                tasks: default_tasks
            }
        }
    });

    grunt.registerTask('default', default_tasks);
};
