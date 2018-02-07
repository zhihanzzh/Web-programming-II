const gulp = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const rename = require("gulp-rename");

const sassFiles = [
    "./node_modules/tether/dist/css/tether.css",
    "./src/styles/variables.scss",
    "./src/styles/custom.scss"
];

gulp.task("sass", () => {
    gulp.src(sassFiles)
        .pipe(gulpSASS())
        .pipe(concatenate("styles.css"))
        .pipe(gulp.dest("./public/css/"))
        .pipe(autoPrefix())
        .pipe(cleanCSS())
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest("./public/css/"));
});

gulp.task("watch", () => {
    gulp.watch(sassFiles, ["sass"]);
});