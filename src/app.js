import express from "express"
import handlebars from "express-handlebars";
import viewsRouter from './routes/viewsRouter.js'
import {Server} from 'socket.io'
import {__dirname} from './path.js'


const app = express()
const httpServer = app.listen(8080,() => console.log("Ando de rutini"))
const socketServer= new Server(httpServer);

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname +'views')
app.set('view engine','handlebars')
app.set('views','./src/views')
app.use(express.static('src/public'))

app.use('/',viewsRouter)

const mensajes =[]

socketServer.on('connection',(socket) => {
    

    
    console.log('Se conectó el usuario', socket.id);
  socket.on('mensaje', (data) => {
    mensajes.push(data);
    socketServer.emit('nuevoMensaje', mensajes);
    
    })


})