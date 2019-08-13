const gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

/*
    --Top level functions--
    gulp.tasks --define tasks
    gulp.src --point to source files
    gulp.dest --set output folder
    gulp.watch --watch for changes.
*/

//log example
gulp.task('message', async() => {
    return console.log('Gulp is running')
})

gulp.task('prepLess', async() => {
    gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist'))
        // .pipe(livereload());
        .pipe(reload({ stream: true }));
});

gulp.task('prepHtml', async() => {
    gulp.src('src/public/*.html')
        .pipe(gulp.dest('dist'))
        // .pipe(livereload());
        .pipe(reload({ stream: true }));
});

gulp.task('prepJs', async() => {
    gulp.src('src/public/JS/**/*.js')
        .pipe(gulp.dest('dist'))
        // .pipe(livereload());
        .pipe(reload({ stream: true }));
});

gulp.task('watch', () => {
    // livereload.listen();
    gulp.watch('src/less/*.less', gulp.series('prepLess'));
    gulp.watch('src/public/*.html', gulp.series('prepHtml'));
    gulp.watch('src/public/js/**/*.js', gulp.series('prepJs'));
});

gulp.task('nodemon', function(cb) {

    var started = false;

    return nodemon({
        script: 'index.js'
    }).on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('start', gulp.series('nodemon'), function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        files: ["dist/**/*.*"],
        // browser: "google-chrome",
        port: 5000,
        notify: false
    });
});

gulp.task('default', gulp.series('start', 'message', 'prepLess', 'prepHtml', 'prepJs', 'watch'));