// import { TurnState } from "../Puissance4/src/components/Turn/Turn";
import { Socket } from "socket.io";

/* eslint-disable @typescript-eslint/no-require-imports */
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';


enum Messages {
	PLAYER_ACTION = "player-action",
	PLAYER_ACTION_RESPONSE = "player-action-response",
	SEND_PLAYER_TURN = "send-player-turn"
}

let userCount = 0;

const maxUserCount = 2;
const port = 3000;
const dev = true; // process.env.NODE_ENV !== "production"
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = createServer((req: IncomingMessage, res: ServerResponse) => {
		const parsedUrl = parse(req.url!, true);
		handle(req, res, parsedUrl);
	}).listen(port);

	const io = new Server(server)

	io.on("connection", (socket: Socket) => {
		// Disconnect new sockets when max connected socket number is reached
		if (userCount >= maxUserCount) {
			console.log('Maximum number of user reached:', userCount)
			socket.disconnect(true) // total disconnection
			return
		}

		userCount++
		console.log("Player connected:", socket.id);
		console.log(`${userCount}/${maxUserCount} users connected`)
		//TODO check if the good player turn is send for the new connected client (case when a client has left)
		if (userCount === 1) {
			socket.emit(Messages.SEND_PLAYER_TURN, 0)
		} else {
			socket.emit(Messages.SEND_PLAYER_TURN, 1)
		}

		// Logic for handling player action
		socket.on(Messages.PLAYER_ACTION, (gameState, playerTurn) => {
			console.log(`Player ${socket.id} is making an action, his turn is ${gameState.turn}`);
			console.log(gameState);

			if (gameState.turn !== playerTurn) {
				socket.emit(Messages.PLAYER_ACTION_RESPONSE, "Non mais oh mec, tu fais quoi la, c'est pas ton tour !")
			} else {
				socket.emit(Messages.PLAYER_ACTION_RESPONSE, "Tu peux y aller mec")
				//TODO Call function that will update the gameState then send it to everyone so they can update it
			}
		})

		socket.on("disconnect", () => {
			userCount--
			console.log("Player disconnected:", socket.id);
		});
	})

	console.log(`Server listening at http://localhost:${port}`);
});