'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Optimize html
gulp.task('html', function () {
    return gulp.src(['app/*.html', 'app/views/*.html'], {base: 'app'})
        .pipe($.minifyHtml())
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'html'}));
});

// Optimize images
gulp.task('images', ['copy-images'], function () {
    return gulp.src(['app/img/*', 'app/views/images/*.png'], {base: 'app'})
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'images'}));
});

// Copy images that can't be optimized (probably corrupted)
gulp.task('copy-images', function () {
    return gulp.src('app/views/images/pizzeria.jpg', {base: 'app'})
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'copy-images'}));
});

// Optimize styles
gulp.task('styles', function () {
    return gulp.src(['app/css/*.css', 'app/views/css/*.css'], {base: 'app'})
        .pipe($.sourcemaps.init())
        .pipe($.csso())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'styles'}));
});

// Optimize scripts
gulp.task('scripts', function () {
    return gulp.src(['app/js/*.js', 'app/views/js/*.js'], {base: 'app'})
        .pipe($.sourcemaps.init())
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'scripts'}));
});

// Clean output directory
gulp.task('clean', del.bind(null, 'dist'));

// Build all
gulp.task('build', ['clean'], function (cb) {
    runSequence(['html', 'images', 'styles', 'scripts'], cb);
});

// Watch files for changes & reload
gulp.task('serve', ['build'], function () {
    browserSync({
        server: 'dist',
        tunnel: true
    });

    gulp.watch(['app/*.html', 'app/views/*.html'], ['html', reload]);
    gulp.watch(['app/css/*.css', 'app/views/css/*.css'], ['styles', reload]);
    gulp.watch(['app/js/*.js', 'app/views/js/*.js'], ['scripts', reload]);
    gulp.watch(['app/img/*', 'app/views/images/*'], ['images', reload]);
});
