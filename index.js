require('dotenv').config() // load all env variables
const http = require('http')
const url = require('url')
const { getUser } = require('./model')
const serverPortNo = process.env.SERVER_PORT || 8080

const server = http.createServer(async (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'})
  const q = url.parse(req.url, true).query
  const userId = q.user_id
  const { id, title, firstName, surname, dateOfBirth } = await getUser({ userId })
  res.write(`Found user: ID: ${title} ${surname} ${firstName} ${dateOfBirth}`)
  res.end()
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
})

console.log(`HTTP server running on port ${serverPortNo}`)
server.listen(serverPortNo)
