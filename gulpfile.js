var gulp = require("gulp"),
    jade = require("gulp-jade"),
    sass = require("gulp-sass");

var paths = {};
paths.base = "";
paths.dist = "dist/";

paths.jade = [
    paths.base + "**/*.jade"
];


//paths.htmlPartials = [
//    paths.tmp + "partials/**/*.html",
//    paths.tmp + "modules/**/*.html",
//    "!" + paths.tmp + "partials/includes/**/*.html",
//    "!" + paths.tmp + "/modules/**/includes/**/*.html"
//];


paths.sass = [
    paths.base + "sass/*.scss",
];

gulp.task("styles", function() {
  return gulp.src(paths.sass)
    .pipe($.plumber())
    .pipe($.cached())
    .pipe($.sass({
      endless:"true",
      errLogToConsole: true,
      includePaths: [
        paths.sass,
      ]
    }))
    .pipe($.autoprefixer({
      browsers: ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1"],
      cascade: false
    }))
    .pipe($.remember("styles"))
    .pipe($.concat("style.css"))
    .pipe(gulp.dest(paths.dist));
});

gulp.task("templates", function() {
    return gulp.src(paths.jade)
        .pipe(plumber())
        .pipe(cached("jade"))
        .pipe(jade({pretty: true, locals:{v:version}}))
        .pipe(gulp.dest(paths.dist));
});


gulp.task("compile", ["styles", "templates"]);

gulp.task("watch", function() {
  gulp.watch(paths.sass, ["styles", "webserver-reload"]);
  gulp.watch(paths.jade, ["templates","webserver-reload"]);
});

gulp.task("default", ["compile", "watch", "dev-webserver"]);
