var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var fs = require("fs");
var del = require('del');
var confound = require("./confoundCode");

var config = fs.readFileSync("config.json", 'utf8');
	config = JSON.parse(config);
var paths = {
  scripts: config.path + '/script/**/*',
  styles: config.path + '/style/**/*',
  images: config.path + '/image/**/*'
};

gulp.task('clean', function(cb){
	del(['dest'], cb);
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(confound());
    .pipe(gulp.dest(config.path+'/dest/js'));
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(concat("main.min.css"))
    .pipe(gulp.dest(config.path+'/dest/css'));
});

gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(config.path+'/dest/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['clean','scripts', 'styles','images']);