'use strict'

const path = require('path');
const gulp = require('gulp');
const connect = require('gulp-connect')
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const serverPath = path.resolve(__dirname);

// browser-sync 自动刷新，暂时没有使用
gulp.task('browser-sync', ['nodemon'], function() {
  console.log('ready to brower-sync~~~~~~~~~~~~~~')
  browserSync.init(null, {
    proxy: "http://localhost:9008", // 这里的端口和 webpack 的端口一致
    port: 9009
  });
});

// 监听文件 配置里启动 nodemon 任务
gulp.task('mock', ['nodemon'], function() {
  gulp.watch(['./db.js', './response/**', './rules/**'], ['bs-delay']);
  console.log('>>>>>>>working in mock task...')
});

// 延时刷新
gulp.task('bs-delay', function() {
  console.log('>>>>>>working in task bs-delay...')
  setTimeout(function() {
    browserSync.reload();
  }, 800);
});

gulp.task('reload',function(){
  console.log('>>>>>> reloading .....')
  gulp.src(['./db.js', './response/**', './rules/**'])
      .pipe(connect.reload());
});
let started = false
// 服务器重启
gulp.task('nodemon', function(cb) {
  console.info('>>>>>>>>>> working in task nodemon <<<<<<<<')
  // 设个变量来防止重复重启
  // let started = false;
  const stream = nodemon({
    script: 'server.js',
    // 监听文件的后缀
    ext: "js json",
    env: {
      'NODE_ENV': 'development'
    },
    // 监听的路径
    // watch: [
    //   serverPath
    // ]
  });
  
  stream.on('start', function() {
    console.log('>>>>>>>> nodemon stream started ~~~~~~~~~~~~~~')
    if (!started) {
      cb();
      started = true;
    }
  }).on('crash', function() {
    console.error('application has crashed!\n')
    stream.emit('restart', 10)
  }).on('restart', function (files) {
    console.log('App restarted due to: ', files);
  });
});