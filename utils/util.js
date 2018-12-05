let Path = require('path')
const fs = require('fs');

const util = {
    /**
   * 把目录转换成驼峰做成 key
   * @param {*} str 路径字符串
   */
  genRulesKey(pathStr) {
    let _path = pathStr
    _path = _path.replace(/[-_+.:]/g, '')  //消除特殊字符
    if(_path.indexOf('/') === 0){
      _path = _path.substr(1)
    }
    let _dirArr = _path.split('/')
    for(let i = 1; i< _dirArr.length; i++){
      let tmp = _dirArr[i]
      _dirArr[i] = tmp.charAt(0).toUpperCase() + tmp.substr(1)
    }

    let key = _dirArr.join('')
    return key
  },
  getPath(file) {
    // console.log('__dirname: ',__dirname, ' Path.resolve file: ', Path.resolve(file))
    return Path.resolve(file);
  },
  /**
   * 获取文件内容
   * @param {String} file 文件路径
   */
  getContent(file) {
    const fileName = this.getPath(file);
    let content = ''
    console.log('getContent file from: ', file)
    if(file.indexOf('.json') > 0){  // xxx.json
      content = fs.readFileSync(fileName).toString();
      content = JSON.parse(content) // json 格式的读取文件流返回的是字符串，需要自行转换成 json
    } else {  // xxx.js
      content = require(file)
      console.log('******* in getContent with .js extend ********\n ', content)
    }
    
    return content;
  }
}

module.exports = util
