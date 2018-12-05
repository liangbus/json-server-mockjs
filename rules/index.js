const originalRules = [];

function concatHelper(arrList) {
  const notEmptyArrayList = arrList.filter(arrItem => {
    return arrItem instanceof Array && arrItem.length
  })
  return notEmptyArrayList.reduce((pre, next) => {
    return pre.concat(next)
  })
}

const rules = concatHelper([
  require('./project-demo/index.js'),
  require('./tree/test.js'),
  originalRules
]);

module.exports = rules