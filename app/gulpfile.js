/* Requiring necessary packages */
var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browsersync = require('browser-sync'),
	changed = require('gulp-changed'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	imagemin = require('gulp-imagemin'),
	sourcemaps = require('gulp-sourcemaps');

/* Setting base project constants */
const paths = {
	src: './src/',
	dest: '../'
};

/* Setting an error swallower */
var swallowError = function(error) {
	console.log(error.toString())
	this.emit('end')
}

/*
* BASIC
*
* Those listed below are the basic tasks
* for compiling & distributing files
*/
gulp.task('php', function() {
	gulp.src([paths.src + '**/*.php'])
		.pipe(changed(paths.dest))
		.pipe(gulp.dest(paths.dest));
});

gulp.task('html', function() {
	gulp.src([paths.src + '**/*.html'])
		.pipe(changed(paths.dest))
		.pipe(gulp.dest(paths.dest));
});


gulp.task('css', function() {
	gulp.src(['foo/*', 'bar/*'])
	gulp.src([paths.src + 'scss/**/*.scss', paths.src + 'scss/*.scss'])
		.pipe(changed(paths.dest))
		.pipe(sass())
		.on('error', swallowError)
		.pipe(autoprefixer())
		.pipe(cssnano({zindex: false}))
		.pipe(concat('style.css'))
		.pipe(gulp.dest(paths.dest));
});

gulp.task('js', function() {
	gulp.src([paths.src + 'js/**/*.js', paths.src + 'js/*.js'])
		.pipe(changed(paths.dest + 'js'))
		.pipe(uglify())
		.pipe(concat('scripts.min.js'))
		.pipe(gulp.dest(paths.dest + 'js'));
});

gulp.task('img', function () {
	// Setting allowed images
	gulp.src([
		paths.src + 'img/*.*'
	])
		.pipe(changed(paths.dest + 'img'))
		.pipe(imagemin([
			imagemin.jpegtran({ progressive: true })
		]))
		.pipe(gulp.dest(paths.dest + 'img'));
});

gulp.task('fonts', function() {
	gulp.src([paths.src + 'fonts/*.*'])
		.pipe(gulp.dest(paths.dest + 'fonts'));
});

gulp.task('libs', function() {
	/* 
	* Here comes all the third-party files
	* like Fontawesome, bulma...
	*/

	// CSS Libs
	gulp.src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/font-awesome/scss/font-awesome.scss',
		'node_modules/animate.css/animate.min.css'
		
	])
		.pipe(changed(paths.dest + 'css'))
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(concat('libs.min.css'))
		.pipe(gulp.dest(paths.dest + 'css'));

	// JS Libs
	gulp.src([
		'node_modules/jquery/dist/jquery.min.js'	
	])
		.pipe(changed(paths.dest + 'js/libs'))
		.pipe(uglify())		
		.pipe(concat('libs.min.js'))
		.pipe(gulp.dest(paths.dest + 'js/libs'));
});

gulp.task('watch', function() {
	var php = gulp.watch([paths.src + '**/*.php'], ['php']),
		html = gulp.watch([paths.src + '**/*.html'], ['html']),
		css = gulp.watch([paths.src + 'scss/**/*.scss'], ['css']),
		js = gulp.watch([paths.src + 'js/**/*.js'], ['js']);

	browsersync.init([paths.dest], {
		proxy: 'http://localhost/',
		browser: 'chrome',
		port: 3000,
		notify: false
	});
});

/*
* SERVER
* This task compiles every file in
* the project, without starting
* browsersync for development
*/
gulp.task('server', ['php', 'html', 'css', 'js', 'img', 'fonts', 'libs']);

/*
* GLOBAL
*
* This task runs everything in basic
* task list, except "Deploy task"
*/
gulp.task('default', ['php', 'html', 'css', 'js', 'img', 'libs', 'watch']);