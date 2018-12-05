const jsonServer = require('json-server')
const db = require('./db.js')
const routes = require('./routes.js')
const port = 7788
let Path = require('path')
let glob = require('glob')

const server = jsonServer.create()
const router = jsonServer.router(db)
const middleWares = jsonServer.defaults()
const rewriter = jsonServer.rewriter(routes)

server.use(middleWares)

// router.render = (req, res) => {
//   console.log('intercept a request !!!', res)
//   // res.status(404).jsonp({
//   //   error: "error message here"
//   // })
  
// }
// Add custom routes before JSON Server router
// server.get('/echo', (req, res) => {
//   res.jsonp(req.query)
// })
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  // console.log('server.use: ===============', req)

  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// 将 POST 请求转为 GET
server.use((request, res, next) => {
  request.method = 'GET'
  next()
})
// 注意：rewriter 的设置一定要在 router 设置之前
server.use(rewriter)
server.use(router)

server.listen(port, () => {
  console.log('Now mock server is running at localhost:' + port)
})