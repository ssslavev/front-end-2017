const gulp = require("gulp");
const clean = require("gulp-clean");
const uglify = require("gulp-uglify");
const pump = require("pump");
const babel = require("gulp-babel");

gulp.task("clean", () => {
    gulp.src("build", { read: false })
        .pipe(clean());
})

gulp.task("test", () => {
    console.log("test");
})

gulp.task("move", () => {
    gulp.src(['*controllers/*.*'])
        .pipe(gulp.dest("build"))
})

gulp.task("uglify:js", () => {

    gulp.src("js/*.js")
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("build"))
        .pipe(gulp.dest('build/js'))

})