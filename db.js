const Mock = require('mockjs');
// const fs = require('fs');
// const Path = require('path')
// const glob = require('glob')
const Rules = require('./rules');
const util = require('./utils/util')
// var path = require('path'); //系统路径模块
var result = require('./response/tree/result.json')
var mockData = {}
for(let i = 0; i < Rules.length; i++) {
  let ruleItem = Rules[i]
  let _url = ruleItem.url
  let _solution = util.getPath(ruleItem.solution)
  let _key = util.genRulesKey(_url)
  mockData[_key] =  util.getContent(_solution)
  // console.log('log solution >>>>>>>>>>>>>>>>>>>>>', util.getContent(_solution))
}

// function getContent(file) {
//   const fileName = getPath(file);
//   const content = fs.readFileSync(fileName).toString();
//   return JSON.parse(content);
// }
// let _solution = interceptUrl('/project-demo')
// function interceptUrl(url) {
//   return Rules.filter(item => {
//     return item.url.indexOf(url) > -1
//   })
// }

// function getPath(file) {
//   return Path.resolve(__dirname, file);
// }

// function Router(req, res) {
//   let _url = req.url;
//   let matchRuleItem = interceptUrl(_url)[0]
//   const host = req.headers.host || '';
//   const solution = matchRuleItem && matchRuleItem.solution || null;
// }
//这里成功保存了数据流了
console.log('>>>>> mock data: \n', mockData, '\n\n')

module.exports = mockData

// module.exports = {
//   // "demo/result": "response/tree/result.json",
//   "abcd": result,
//   getDemo: result,
//   getComment: Mock.mock({
//     "error": 0,
//     "message": "success",
//     "result|40": [{
//       "author": "@name",
//       "comment": "@cparagraph",
//       "date": "@datetime"
//     }]
//   }),
//   addComment: Mock.mock({
//     "error": 0,
//     "message": "success",
//     "result": []
//   })
// }
