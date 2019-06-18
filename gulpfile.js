const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssModules = require('postcss-modules');
const { default: defaultScopedName } = require('postcss-modules/build/generateScopedName');
const sass = require('gulp-sass');
const browserify = require('browserify');
const log = require('fancy-log');
const aliasify = require('aliasify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

sass.compiler = require('node-sass');

gulp.task('js', function (done) {
    browserify({
        entries: './index.js',
        debug: true,
    })
    .transform(aliasify, {
        replacements: {
            // Require the json CSS module maps instead of the content of the scss files
            // Make same behaviour as create-react-app css modules
            // We process the scss files into css first - see below
            '\.module\.scss': '\.module\.css\.json',
        },
        verbose: true,
    })
    .bundle()
    .pipe(source('.'))
    .on('error', log.error)
    .pipe(buffer())
    .pipe(gulp.dest('./dest/bundle.js'))
    .on('end', done);
});

gulp.task('css', function (done) {
    gulp.src('./css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
        cssModules({
            generateScopedName: function (name, filename, css) {
                if (!/\.module\.css$/.test(filename)) {
                    // Return real name for non .module.css files (is .module.css not .module.scss as
                    // we process scss first)
                    return name;
                }
                return defaultScopedName(name, filename, css);
            },
        }),
    ]))
    .pipe(gulp.dest('./dest/css'))
    .on('end', done);
});

gulp.task('default', gulp.series('css', 'js', function (done) {
    done();
}));
