var gulp = require('gulp')
var concat = require('gulp-concat')
var babel = require('gulp-babel')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var del = require('del')
var gutil = require('gulp-util')
var paths = {
  scripts: 'src/js/**/*.js'
}
// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build'])
})

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return (gulp
      .src(paths.scripts)
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(sourcemaps.init())
      .pipe(
        uglify({
          mangle: true,
          compress: true
        })
      )
      .on('error', function(err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString())
      })
      // .pipe(concat('all.min.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/js')) )
})

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts'])
})

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts'])
