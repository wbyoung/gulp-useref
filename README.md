# [gulp](https://github.com/wearefractal/gulp)-useref [![Build Status](https://travis-ci.org/jonkemp/gulp-useref.png?branch=master)](https://travis-ci.org/jonkemp/gulp-useref)

> Parse build blocks in HTML files to replace references to non-optimized scripts or stylesheets with [useref](https://github.com/digisfera/useref)

Inspired by the grunt plugin [grunt-useref](https://github.com/pajtai/grunt-useref), but it does not do file concatenation or minification. You can use [gulp-bundle](https://github.com/jonkemp/gulp-bundle) or other gulp plugins for those tasks.


## Install

Install with [npm](https://npmjs.org/package/gulp-useref)

```
npm install --save-dev gulp-useref
```


## Usage

```js
var gulp = require('gulp');
var useref = require('gulp-useref');

gulp.task('default', function () {
	return gulp.src('./*.html')
        .pipe(useref())
        .pipe(gulp.dest('build/'));
});
```

You can use gulp-useref by itself with separate tasks for concatenation and minification of files. But if you have multiple build blocks where you want to concat those files separately, you can use [gulp-bundle](https://github.com/jonkemp/gulp-bundle) to handle this.

```js
var gulp = require('gulp'),
    useref = require('gulp-useref'),
    bundle = require('gulp-bundle');

gulp.task('bundle', bundle('./app/*.html', {
    appDir: 'app',
    buildDir: 'build',
    minify: true
}));

gulp.task('html', function(){
    return gulp.src('./app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('build/'));
});

gulp.task('build', ['bundle', 'html']);
```


The build block syntax is `build:type id`. Valid types are `js` and `css`.

    <html>
    <head>
        <!-- build:css css/combined.css -->
        <link href="css/one.css" rel="stylesheet">
        <link href="css/two.css" rel="stylesheet">
        <!-- endbuild -->
    </head>
    <body>
        <!-- build:js scripts/combined.js -->
        <script type="text/javascript" src="scripts/one.js"></script>
        <script type="text/javascript" src="scripts/two.js"></script>
        <!-- endbuild -->
    </body>
    </html>


The resulting HTML would be:

    <html>
    <head>
        <link rel="stylesheet" href="css/combined.css"/>
    </head>
    <body>
        <script src="scripts/combined.js"></script>
    </body>
    </html>


## License

MIT © [Jonathan Kemp](http://jonkemp.com)
