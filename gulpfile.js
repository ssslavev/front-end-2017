const gulp = require("gulp");
const del = require("del");
const eslint = require("gulp-eslint");
const uglify = require("gulp-uglify");
const pump = require("pump");
const babel = require("gulp-babel");
const cleanCSS = require("gulp-clean-css");
const gulpsync = require("gulp-sync")(gulp);


//Clean build directory
gulp.task("clean", () => {
    return del("build");
})

//Move files to build directory
gulp.task("move", () => {
    gulp.src(['*images/*.*', 'index.html', 'package.json', '*templates/*.*'])
        .pipe(gulp.dest("build"))
})


//Uglify js and css
gulp.task("uglify:js", () => {

    gulp.src(["*js/*.js", "*controllers/*.js"])
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("build"))
})

gulp.task('uglify:css', () => {
    return gulp.src('styles.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('build'));
});

gulp.task('uglify', ['uglify:js', 'uglify:css']);

gulp.task('build', gulpsync.sync(['clean', 'move', 'uglify']));