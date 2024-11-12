/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');
import { TurnState } from "src/components/Turn/Turn";

let userCount = 0;

const maxUserCount = 2;
const port = 3000;
const dev = true; // process.env.NODE_ENV !== "production"
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  const io = new Server(server)

  io.on("connection", (socket) => {
    // Disconnect new sockets when max connected socket number is reached
    if (userCount >= maxUserCount) {
      console.log('Maximum number of user reached:', userCount)
      socket.disconnect(true) // total disconnection
      return
    }

    userCount++
    console.log("Player connected:", socket.id);
    console.log(`${userCount}/${maxUserCount} users connected`)
    if (userCount === 1) {
      socket.emit("send-player-turn", TurnState)
    } else {

    }
    // socket.emit("receive-player-turn", )

    // Logic for handling player action
    socket.on("player-action", (gameState, playerTurn) => {
      console.log(`Player ${socket.id} is making an action, his turn is ${gameState.turn}`);
      console.log(gameState);
      if (gameState.turn !== playerTurn) {
        socket.emit("player-action-response", "Non mais oh mec, tu fais quoi la, c'est pas ton tour !")
      } else {
        socket.emit("player-action-response", "Tu peux y aller mec")
      }
    })

    socket.on("disconnect", () => {
      console.log("Player disconnected:", socket.id);
      userCount--
    });
  })

  console.log(`Server listening at http://localhost:${port}`);
});