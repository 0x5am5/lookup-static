module.exports = function(grunt) {
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		watch: {
			options: {
				livereload: true
			},
			sass: {
				files: ['app/sass/**/*.scss'],
				tasks: ['sass'],
			},
			scripts: {
				files: 'app/**/*.js',
				tasks: ['webpack']
			}
		},

		sass: {
			dev: {
				options: {
        			style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: './app/sass',
					src: ['*.scss'],
					dest: './dist/assets/css',
					ext: '.css'
				}]
			},
			dist: {
				options: {
          			style: 'compressed',
          			sourcemap: false
				},
				files: [{
					expand: true,
					cwd: './app/sass',
					src: ['*.scss'],
					dest: './dist/assets/css',
					ext: '.css'
				}]
			}
		},

		connect: {
	      server: {
	        options: {
	          port: 9001,
	          base: 'dist',
	          livereload: true,
	          open: true
	        }
	      }
	    },

		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes 
				]
			},
			dist: {
				src: 'dist/assets/css/*.css'
			}
		},

		webpack: {
			options: {
				module: {
					loaders: [
						{
							loader: 'babel',
							query: {
								presets: ['es2015']
							}
						}
					]
				},
				stats: {
					colors: true,
					reasons: true
				},
				progress: false,
				failOnError: false
				},
				build: {
					entry: "./app/app.module.js",
					output: {
						path: "./dist/assets/js/",
						filename: "main.js",
				},
			}
		},

		yuidoc: {
			compile: {
				name: 'Lookup',
				description: 'JS associated with Lookup App',
				version: '0.0.1',
				options: {
					paths: 'app/',
					outdir: './docs'
				}
			}
		},

		uglify: {
		 	dist: {
		 		files: {
		 			'./dist/assets/js/main.js': './dist/assets/js/main.js'
		 		}
		 	}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', function() {

		grunt.task.run(['sass:dev', 'webpack', 'connect', 'watch']);

	});
	// Build task
	grunt.registerTask('build', ['sass:dist', 'postcss', 'yuidoc', 'webpack', 'uglify']);

};