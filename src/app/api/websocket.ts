import { TurnState } from "@/components/Turn/Turn";
import { GameGridValueInterface } from "@/hooks/useIAGame"; //TODO change it by the one of the multiplayer game
import io, { Socket } from 'socket.io-client';


export function createSocket() {
  const socket = io('http://localhost:3000');
  return socket
}

export function sendPlayerAction(socket: Socket, gameState: GameGridValueInterface, playerTurn: TurnState) {
  try {
    socket.emit('player-action', gameState, playerTurn);
    socket.on("player-action-response", (status: string) => {
      console.log(status);
    })
  } catch (error) {
    console.error('Error:', error);
  }
}