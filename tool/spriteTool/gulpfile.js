var gulp=require('gulp'),  //gulp基础库
    spritesmith=require('gulp.spritesmith'), //制作雪碧图插件
    postcss = require('gulp-postcss'),
    px2rem = require('postcss-px2rem'),
    clean   = require('gulp-clean');
gulp.task('px2rem',['sprite'],function() {
	var processors = [px2rem({remUnit: 40})];
    return gulp.src('./css/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./dist'));
});
gulp.task('cleanImg',['px2rem'],function(){
    return gulp.src('./img/*').pipe(clean());
});
gulp.task('cleandist',function(){
    return gulp.src('./dist/').pipe(clean());
});
gulp.task('sprite',['cleandist'],function(){  
    return  gulp.src('img/*.png')  
        .pipe(spritesmith({  
            imgName:'sprite.png',  
            cssName:'../css/style.css',  
            padding:15,  
            algorithm:'top-down'  
        }))  
        .pipe(gulp.dest('dist/')) //输出目录
});


gulp.task('default',function(){
    gulp.start('cleanImg');
});