#spriteTool

本插件用于制作雪碧图。

依赖: node.js

使用方法：

1，下载该文件夹
2，下载完成后  cmd 进入 下载文件夹
3，进入文件夹后  cmd 执行 npm install
4, 初始化完成
5，将要合成雪碧图的图片 放入 img文件夹
6，点击执行相应的bat,将会自动和成雪碧图 和相应的css文件 并且置于dist文件夹


bat 文件简介

1，sprite_clearimg_rem.bat : 执行此bat 将清空源文件，生成雪碧图，并将对应css 转化为rem， html 字体大小在gulp.file.js 第7行修改 remUnit值。
2，sprite_rem.bat:执行bat，生成雪碧图，生成对应css文件，单位为‘rem’,不会清空源文件。
3，sprite_px.bat:执行bat，生成雪碧图，生成对应css文件，单位为‘px’,不会清空源文件。