# knockout-demo
# node.js -- server.js
  # 启动命令：node server.js或npm run start
  # 依赖：http-proxy-middleware和express两个模块，使用server.js启动服务前需要安装
   # npm install --save-dev http-proxy-middleware
   # npm install --save-dev express
  # 并引入上述模块：
   # var express = require('express');
   # var proxy = require('http-proxy-middleware');
   # var app = express();

  #这两句:
   # app.use('/', express.static('./views'));--用来指定服务访问页面文件的指定根目录，访问写法是：localhost:8082/index.html--实际上index.html是在views/目录下的
   # app.use('/resources', express.static('./resources')); --那这个就是资源加载目录的指定了

  # 下面这一句就是启动服务的代码了，并发送给客户端响应头和响应体
   # var server = http.createServer(function(req,res){ --创建服务
   # res.setHeader('Content-Type','text/plain'); --设置响应头
   # res.end("hello nodejs"); --发送响应体
   # });

  # 最后一句就是配置监听端口了
   # var server = app.listen(8082, function () { --这里的8082就是浏览器启动服务用的项目端口，用法：localhost:8082/index.html
   # console.log('Server start port:8082');
   # });


# require.js -- require.config.js
 # 最简单的文件加载：
 # <script src="../resources/js/libs/require.js" data-main="../resources/js/apps/index"></script>

 # 推荐把配置文件的内容写在require.js库文件的最后
 # .
 # .
 # .
 # var _CONTEXTPATH = '/resources';
 # var requireConfig = {
 # 	baseUrl: _CONTEXTPATH +"/js/apps/",
 #	paths: {
 #       jquery: '../libs/jquery-1.11.3.min',
 #       layui: '../libs/layui/layui.all',
 #       ko: '../libs/knockout-3.4.2',
 #       text: '../libs/text',
 #       components: '../../components'
 #	},
	
 #	shim: {
 # 		layui: {
 #			deps: ['jquery'],
 #           exports: 'layui'
 #      },
 #       ko: {
 #           exports: 'ko'
 #       }
 #	}
 #	/*,
 #   
 #};

# index.js中也需引用require配置

# require.config(requireConfig); // require配置对象写在了require.js库文件的最后，在这里也需要用config配置方法引用一下
# require(['jquery', 'layui', 'ko'], function($, layui, ko) {
   # var layer = layui.layer;
   # var vm = {
      # projectName: 'knockout项目'
   # };
   # layer.msg('hello');
   # ko.applyBindings(vm);
# })
# 上面简单几行代码就把jquery、layui和ko框架都加载进来了，非常不错

# require.js加载html模板
 # 1、首先要载入text.js(或安装npm require-text插件)
 # 载入写法是：
 # var requireConfig = {
	baseUrl: _CONTEXTPATH +"/js/apps/",
	paths: {
        jquery: '../libs/jquery-1.11.3.min',
        layui: '../libs/layui/layui.all',
        ko: '../libs/knockout-3.4.2',

        text: '../libs/text',

        components: '../../components'
 # 	},

 # 2、然后index.js写法是
 # require(['jquery', 'layui', 'ko', "text!../../components/header/header.html"], function($, layui, ko, header) {
    var layer = layui.layer;
    var vm = {
        projectName: 'knockout项目'
    };
    layer.msg('hello');
    ko.applyBindings(vm);
    // $('#target').html(require("text!目标按钮对应的页面.html"));

    $('#header').html(header);

# })
# 在require依赖数组中用"text:模板路径/文件名"方式导入模板模块，再用$('#header').html(header);嵌入方式引用即可。
# 注意：对应的页面样式文件放在嵌入模板的主html页面中即可。





# gulp命令的启动
  #1、首先得引入一个gulpfile.js的命令配置文件，专门执行less文件编译的
  #2、其次可以在命令行里面试一下，gulp less这样的编译命令，若发现不成功，报gulp命令不识别的话，证明了gulp因为文件目录移动了以后，发生了版本冲突，导致gulp命令直接不可使用
  #3、解决办法就是：在package.json的npm脚本中配置启动gulp的命令，如：
   # "scripts": {
    # "test": "echo \"Error: no test specified\" && exit 1",
    # "start": "node server.js",
    # "build": "gulp",
    # "watch": "gulp watch"
   # },
   # 执行其中的build或watch均可启动gulp命令来编译less成css，并监听
   # 执行命令是：npm run build或npm run watch
   # 执行结果为：
    [22:47:17] Using gulpfile D:\E\my-project\knockout-demo\gulpfile.js
    [22:47:17] Starting 'less'...
    [22:47:17] Finished 'less' after 162 ms
    [22:47:17] Starting 'watch'...
    [22:47:17] Finished 'watch' after 11 ms
    [22:47:17] Starting 'default'...
    [22:47:17] Finished 'default' after 22 μs

# gulpfile.js源码是：
# var gulp = require('gulp'),
  #   less = require('gulp-less'),
  #   LessAutoprefix = require('less-plugin-autoprefix'),
  #   sourcemaps = require('gulp-sourcemaps'),
  #   notify = require('gulp-notify'),
  #   plumber = require('gulp-plumber');

# var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
# var _path = './resources';

# gulp.task('less', function () {
   #  return gulp.src(_path + '/less/**/*.less') // 1、找到less目录下的所有less文件
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sourcemaps.init())
        .pipe(less({ // 2、执行less()方法编译为css
            plugins: [autoprefix]
        }))
        // .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(_path + '/css')); // 3、另存为css路径
# })

# gulp.task('watch', ['less'], function () { //在命令行gulp watch启动此监听less文件修改的任务
    gulp.watch([_path + '/less/**/*.less',_path + '/less/*.less'], ['less']);//监听文件修改，当文件修改则执行less任务
# });

# gulp.task('default', ['watch']);//使用gulp.task('default')定义默认任务，默认任务就是监听文件修改

# 载入重置用css文件reset.css
# <link type="text/css" rel="stylesheet" href="/resources/css/reset.css">

  