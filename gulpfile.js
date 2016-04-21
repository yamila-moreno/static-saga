var gulp = require("gulp"),
    jade = require("gulp-jade"),
    sass = require("gulp-sass"),
    webserver = require('gulp-webserver'),
    plumber = require('gulp-plumber');

var paths = {};
paths.dist = "dist/";
paths.jade = [ "**/*.jade" ];
paths.sass = "sass/**.scss",
paths.style = "sass/style.scss",

gulp.task('dev-webserver', function() {
    return gulp.src(paths.dist)
        .pipe(webserver({
            livereload: true
        }));
});

gulp.task("styles", function() {
  return gulp.src(paths.style)
    .pipe(plumber())
    .pipe(sass({
      endless:"true",
      errLogToConsole: true,
      includePaths: [
        paths.sass,
      ]
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task("templates", function() {
    return gulp.src(paths.jade)
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(paths.dist));
});

gulp.task("compile", ["styles", "templates"]);

gulp.task("watch", function() {
  gulp.watch(paths.sass, ["styles"]);
  gulp.watch(paths.jade, ["templates"]);
});

gulp.task("default", ["compile", "watch", "dev-webserver"]);
