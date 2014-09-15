'use strict';

var gulp = require('gulp'),
    notify = require("gulp-notify"),
    karma = require("gulp-karma");


gulp.task('test', function () {
    var files = ["undefined.js"];
    return gulp.src(files)
        .pipe(karma({
            configFile: 'karma.conf.'+ js,
            action: 'run'
        }))
        .pipe(notify("test ok!"));
});
