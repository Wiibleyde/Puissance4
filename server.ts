import { Socket } from "socket.io";

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';

enum Messages {
	PLAYER_ACTION = "player-action",
	UPDATE_GAME_STATE = "update-game-state",
	SEND_PLAYER_TURN = "send-player-turn"
}

let userCount = 0;

const maxUserCount = 2;
const port = 3000;
const dev = true; // process.env.NODE_ENV !== "production"
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	// initializes a custom server to host the websocket server
	const server = createServer((req: IncomingMessage, res: ServerResponse) => {
		const parsedUrl = parse(req.url!, true);
		handle(req, res, parsedUrl);
	}).listen(port);

	// creates the websocket server
	const io = new Server(server)

	const disconnectAllSockets = () => {
		Array.from(io.sockets.sockets.values()).forEach((socket) => {
			console.log(socket.id);
			socket.disconnect(true);
		});
	}

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

		// Attributes and sends a turn to the player connected
		if (userCount === 1) {
			socket.emit(Messages.SEND_PLAYER_TURN, 0)
		} else {
			socket.emit(Messages.SEND_PLAYER_TURN, 1)
		}

		// Logic for handling player action
		socket.on(Messages.PLAYER_ACTION, (gameState, playerTurn, columnIndex) => {
			console.log(`Player ${playerTurn + 1} and tries to play on column ${columnIndex}`);
			console.log(`Actual game turn: ${gameState.turn + 1}`);

			// checks if the turn of the player that sends an action accords to the gameState turn
			if (gameState.turn === playerTurn) {
				// sends the player action to all the players to update the state
				io.emit(Messages.UPDATE_GAME_STATE, columnIndex);
				console.log(`Player ${playerTurn + 1} can play`);
			} else {
				console.log(`Player ${playerTurn + 1} cannot play`);
			}
		})

		// disconnects all users when a user disconnects of the room
		socket.on("disconnect", () => {
			userCount = 0
			disconnectAllSockets()
		});
	})

	console.log(`Server listening at http://localhost:${port}`);
});