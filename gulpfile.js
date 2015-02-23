'use strict';

var gulp = require('gulp'),
	path = require('path');

gulp.task('copy-todomvc', function () {
	return gulp.src(path.join('node_modules', 'todomvc*', '**'))
		.pipe(gulp.dest(path.join('public', 'lib')));
});

gulp.task('copy-static', function () {
	return gulp.src(path.join('static', '**'))
			.pipe(gulp.dest('public'));
});

gulp.task('default', ['copy-todomvc', 'copy-static']);
