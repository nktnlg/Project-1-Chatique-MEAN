const WebSocket = require('ws');
const http = require('http')

const app = require('./app')
const port = process.env.PORT || 666


const server = http.createServer((req,res)=>{})
const wss = new WebSocket.Server({server})
wss.on('connection', function connection(ws){
    ws.on('message', function incoming(msg){
        console.log(msg.toString())
    })
})


app.listen(port, () => console.log(`Server started on ${port}`))
server.listen(8889, ()=>{console.log('WebSocket on!')})