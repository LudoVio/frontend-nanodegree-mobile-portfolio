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
        .pipe($.sourcemaps.init())
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'scripts'}));
});

// Inline everything we can in index.html
gulp.task('inline', function () {
    gulp.src('dist/index.html')
        .pipe($.inline({base: 'dist'}))
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'inline'}));
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
