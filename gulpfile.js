const gulp = require('gulp');
const postcss = require('gulp-postcss');
const prefixer = require('postcss-prefix-selector');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('default', function(done) {
    const plugins = [
        prefixer({
            prefix: '.ats'
        })
    ];

    gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dest'));

    done();
});
