var
        src_files = [
            'src/*.js', 'src/Visualizers/*.js'
        ],
        default_tasks = [
            'jshint', 'concat'
        ]
        ;

module.exports = function (grunt) {
    require('jit-grunt')(grunt);
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
