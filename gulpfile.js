'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Optimize html
gulp.task('html', function () {
    return gulp.src('app/**/*.html')
        .pipe($.minifyHtml())
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'html'}));
});

// Optimize images
gulp.task('images', function () {
    return gulp.src('app/**/*.{png,jpg}')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'images'}));
});

// Optimize styles
gulp.task('styles', function () {
    return gulp.src('app/**/*.css')
        .pipe($.sourcemaps.init())
        .pipe($.csso())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'styles'}));
});

// Optimize scripts
gulp.task('scripts', function () {
    return gulp.src('app/**/*.js')
        //.pipe($.sourcemaps.init())
        //.pipe($.uglify())
        //.pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'scripts'}));
});

// Inline everything we can in index.html
gulp.task('inline', function () {
    gulp.src('dist/index.html')
        .pipe($.inline({
            base: 'dist',
            ignore: ['js/analytics.js']}))
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'inline'}));
});

// Clean output directory
gulp.task('clean', del.bind(null, 'dist'));

// Build all
gulp.task('build', function (cb) {
    runSequence('clean', ['html', 'images', 'styles', 'scripts'], 'inline', cb);
});

// Serve the dist
gulp.task('serve', ['build'], function () {
    browserSync({
        server: 'dist',
        tunnel: true
    });

    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/**/*.{png,jpg}', ['images']);
    gulp.watch('app/**/*.css', ['styles']);
    gulp.watch('app/**/*.js', ['scripts']);
});
