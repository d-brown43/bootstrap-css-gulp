const gulp = require('gulp');
const postcss = require('gulp-postcss');
const prefixer = require('postcss-prefix-selector');

gulp.task('default', function(done) {
    const plugins = [
        prefixer({
            prefix: '.ats'
        })
    ];

    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dest'));

    done();
});
