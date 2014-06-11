module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		less : {
			'compile' : {
				options : {
					paths : ['assets/styles/less'],
					compress : true
				},
				files : {
					'assets/styles/comprix.css' : 'assets/styles/less/comprix.less'
				}
			}
		},
		jshint : {
			all : ['Gruntfile.js', 'assets/scripts/*.js', '!assets/scripts/emzweb.min.js'],
			tasks : 'jshint'
		},
		concat : {
			js : {
				src : ['assets/scripts/emzweb.js', 'assets/scripts/slider.js'],
				dest : 'assets/scripts/concat.js'
			},
			css : {
				src : ['assets/styles/main.css', 'assets/styles/comprix.css'],
				dest : 'assets/styles/concat.css'
			}
		},
		cssmin : {
			'css' : {
				src : 'assets/styles/concat.css',
				dest : 'assets/styles/emzweb.min.css'
			}
		},
		uglify : {
			options : {
				mangle : false
			},
			'js' : {
				files : {
					'assets/scripts/emzweb.min.js' : ['assets/scripts/concat.js']
				}
			}
		},
		watch : {
			scripts : {
				files : ['assets/scripts/*.js'],
				tasks : ['jshint']
			},
			less : {
				files : ['assets/styles/less/*.less'],
				tasks : ['less']
			},
			concat : {
				files : ['assets/styles/*.css', 'assets/scripts/*.js'],
				tasks : ['concat:css', 'concat:js']
			},
			cssmin : {
				files : ['assets/styles/*.css'],
				tasks : ['cssmin']
			},
			uglify : {
				files : ['assets/scripts/*.js'],
				tasks : ['uglify']
			}
		},
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '*',
                    onCreateServer: function(server, connect, options) {
                        var io = require('socket.io').listen(server);
                        io.sockets.on('connection', function(socket) {
                            // do something with socket
                        });
                    }
                }
            }
        }
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('default', ['less', 'concat', 'cssmin', 'uglify', 'connect', 'watch']);
};
