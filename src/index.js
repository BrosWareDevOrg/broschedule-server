import { app } from './app.js';
import { Server as WebsocketServer } from 'socket.io';
import mongooseConnect from './db.js';
import http from 'http';
import { sockets } from './sockets.js';

mongooseConnect();

const port = process.env.PORT || 5001;

/*
"io" need an HTTP server to comunicate between apps.
Insthead we need to especific with part of our "app" (from Express) want to send.
For that we gonna import "http" from node and specific this before create our websocket server.
*/
const server = http.createServer(app);
const httpServer = server.listen(port || 5001);
console.log(`Server listening on port: ${port || 5001}`);

//Application (web & android or Apple app) connection, this gonna be the real time connection between all apps.
const io = new WebsocketServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
sockets(io);
