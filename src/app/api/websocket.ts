'use server'
import { TurnState } from "@/components/Turn/Turn";
import { GameGridValueInterface } from "@/interfaces";
import io, { Socket } from 'socket.io-client';
import { Messages } from "../../../server";


export async function createSocket() {
  const socket = io('http://localhost:3000');
  return socket
}

export async function sendPlayerAction(socket: Socket, gameState: GameGridValueInterface, playerTurn: TurnState, columnIndex: number) {
  try {
    console.log("Your turn is", playerTurn);
    socket.emit(Messages.PLAYER_ACTION, gameState, playerTurn, columnIndex);
  } catch (error) {
    console.error('Error:', error);
  }
}