const gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload');

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
        .pipe(livereload());
});

gulp.task('prepHtml', async() => {
    gulp.src('src/public/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('prepJs', async() => {
    gulp.src('src/public/JS/**/*.js')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch('src/less/*.less', gulp.series('prepLess'));
    gulp.watch('src/public/*.html', gulp.series('prepHtml'));
    gulp.watch('src/public/js/**/*.js', gulp.series('prepJs'));
});

gulp.task('default', gulp.series('message', 'prepLess', 'prepHtml', 'prepJs'));