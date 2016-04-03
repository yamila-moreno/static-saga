var gulp = require("gulp"),
    jade = require("gulp-jade"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    connect = require('gulp-connect');

var paths = {};
paths.base = "";
paths.dist = "dist/";

paths.jade = [
    paths.base + "**/*.jade"
];

paths.sass = [
    paths.base + "sass/*.scss",
];

gulp.task('dev-webserver', function() {
  connect.server({
    root: paths.dist,
    livereload: true,
    fallback: paths.dist + 'index.html'
  });
});

gulp.task('webserver-reload', function(){
    connect.reload()
});


gulp.task("styles", function() {
  return gulp.src(paths.sass)
    .pipe(sass({
      endless:"true",
      errLogToConsole: true,
      includePaths: [
        paths.sass,
      ]
    }))
    .pipe(concat("style.css"))
    .pipe(gulp.dest(paths.dist));
});

gulp.task("templates", function() {
    return gulp.src(paths.jade)
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(paths.dist));
});

gulp.task("compile", ["styles", "templates"]);

gulp.task("watch", function() {
  gulp.watch(paths.sass, ["styles", "webserver-reload"]);
  gulp.watch(paths.jade, ["templates","webserver-reload"]);
});

gulp.task("default", ["compile", "watch", "dev-webserver"]);
