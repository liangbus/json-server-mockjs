## 目录结构
```
├── reponse                                     // mock 数据
|      ├──── project1                           // 项目
|      ├──── project2                           // 项目
├── rules                                       // 拦截规则，及匹配数据
|      ├──── project1                           // 项目
|      ├──── project2                           // 项目
├── utils                                       // 存放一些公共方法
├── db.js                                       // 读取 mock 数据路径文件
├── gulpfile.js                                 // gulp 任务声明及执行文件
├── package.js                                  // node 依赖包
├── routes.js                                   // 路由文件，跟 db.js 存在映射关系
├── server.js                                   // 服务器相关文件，声明端口，引入路由等
```
### 安装

> 安装 node, npm 这些基本的东西，这里就不一一介绍啦，node 下载地址http://nodejs.cn/download/

目前个人使用的 node 和 npm 版本
```sh
> node -v  
v8.12.0

> npm -v
6.4.1
```

安装好 npm 之后，顺手安装一个 npm 镜像源切换工具 ——> nrm
```sh
#全局安装
npm install -g nrm

#查看可用的源
nrm ls
  npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
* taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/

#切换源，使用taobao源，速度快很多
nrm use taobao
```

进入项目根目录执行
```sh
#安装项目所有的依赖
npm install
```

全部安装成功后执行
```sh
gulp mock
```
_如果这里找不到 gulp 的话，单独全局安装一下 gulp module 吧_
_默认端口是 7788，如果要改变端口，可以到 server.js 中修改_

支行成功后访问 http://127.0.0.1:7788/ 即可查看所有的 mock 请求

### 使用

rules 目录下存放拦截 url 及 mock 数据路径
_按项目来划分目录，比如 rules/tree1/xxx.js, rules/project1/xxx.js, /rules/project1/xxx2.js_
```js
//示例
const rules = [
  {
    url:"/project-demo/",
    solution: "./response/tree/project-demo.json"
  }
]

module.exports = rules
```
reponse 目录存放 mock 数据，结构划分跟 rules 一样
此处可以直接使用 json 格式，也可以使用 .js
```json
//json
{
  "code": 200,
  "data": {
    "isTalent": true
  },
  "msg": "Hi~ what can you see??"
}
```
.js 文件可以同时使用 mockjs 自动生成各种假数据，更多 mockjs 语法请看 >> [传送门](http://mockjs.com/examples.html)
```js
const Mock = require('mockjs');

const mockData = Mock.mock({
    "code": 200,
    "data": {
        "id": "@integer(10000)",
        "name": "@name",
        "age|18-60": 24,
        "isSB|1-2": true,
        "from": "@province()"
    },
    "msg": "you can see me!"
})

module.exports = mockData
```

_如不想用 ip+:port 形式访问的，可以通话 nginx 配置个 server 进行端口转发_

初学 nodejs 仍有很多可以优化的地方，有问题欢迎提出讨论，且欢迎大家共同维护
共勉
