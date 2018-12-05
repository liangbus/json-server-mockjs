
const fs = require('fs');
let Path = require('path')
let glob = require('glob')
const rules = require('./rules/tree/test.js')
const util = require('./utils/util')
const Rules = require('./rules');
// console.log("Rules ~~~~~~~~~~~~~~~~~~", Rules)

// 存放映射关系数据
let mappingData = {}
for(let i = 0; i < Rules.length; i++) {
  let ruleItem = Rules[i]
  let _url = ruleItem.url
  let _key = util.genRulesKey(_url)
  mappingData[_url] = '/' + _key  // 这里不加斜杠的话，映射关系不能生效
}

// 读取所有API文件
// const apiFiles = glob.sync(Path.resolve(__dirname, './rules') + '/**/*.js', {
//   nodir: true
// })
// let data = {}
// // 输出所有api文件 i从1开始 跳过index.js
// for (let i = 0, l = apiFiles.length; i < l; i++) {
//   let api = require(apiFiles[i])
//   if (api.url) {
//     data[api.url] = api.res
//   }
//   console.log('api.res >>>>', api.res)
// }
// console.log('data >>>>', data)
// module.exports = function () {
//   return data
// }
// const rulesArr = glob.sync(Path.resolve(__dirname, './rules') + '/**/*.js', {
//   nodir: true //Do not match directories, only files. (Note: to match only directories, simply put a / at the end of the pattern.)
// })

console.log('mappingData->->->->->->->->-> \n', mappingData)

//Create a routes.json file. Pay attention to start every route with /.
module.exports = mappingData
// module.exports = {
//   "/abcd/heyhey": "/abcd",
//   "/test/result": "/getDemo",
//   "/comment/get": "/getComment",
//   "/comment/add": "/addComment"
// }