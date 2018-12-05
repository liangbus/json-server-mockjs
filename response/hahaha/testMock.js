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
