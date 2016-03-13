'use strict';

const gulp = require('gulp');
const path = require('path');

gulp.task('copy-todomvc', () =>
	gulp.src(path.join('node_modules', 'todomvc*', '**'))
		.pipe(gulp.dest(path.join('public', 'lib')))
);

gulp.task('copy-static', () =>
	gulp.src(path.join('static', '**'))
		.pipe(gulp.dest('public'))
);

gulp.task('default', ['copy-todomvc', 'copy-static']);
