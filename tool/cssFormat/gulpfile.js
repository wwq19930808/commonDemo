var gulp=require('gulp'),  //gulp基础库
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');
    

gulp.task('autoprefixer',function() {
    return gulp.src('./css/*.css')
		.pipe(postcss([ autoprefixer({ browsers: ["last 4 versions"] }) ]))
		.pipe(gulp.dest('./dist/temp'));
});


gulp.task('default',function(){
    gulp.start('autoprefixer');
});


var minifyCSS = require('gulp-minify-css')
// 压缩 css 文件
// 在命令行使用 gulp css 启动此任务
gulp.task('css', function () {
    // 1. 找到文件
   return gulp.src('css/*.css')
    // 2. 压缩文件
        .pipe(minifyCSS({
            compatibility: 'ie8',
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
        }))
    // 3. 另存为压缩文件
        .pipe(gulp.dest('dist/'))
});