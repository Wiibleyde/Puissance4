'use client';
import { createSocket, sendPlayerAction } from '@/app/api/websocket';
import { Turn, TurnState } from '@/components/Turn/Turn';
import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
// import { Messages } from '../../../../server';
import { GameGridValueInterface } from '@/interfaces';
import { useMultiplayerGame } from '@/hooks/useMultiplayerGame';
import { GameGrid } from '@/components/Game/GameGrid';


export default function GamePage() {
  const { gameState, playMove } = useMultiplayerGame();

  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [socketId, setSocketId] = useState<string | undefined>(undefined);
  const [playerTurn, setPlayerTurn] = useState<TurnState | undefined>(undefined);
  const [disconnected, setDisconnected] = useState<boolean>(false);

  // TODO Ajouter fonction dans playMove de la grid
  const onClickSendPlayerAction = (columnIndex: number) => {
    if (socket && playerTurn !== undefined) {
      sendPlayerAction(socket, gameState, playerTurn, columnIndex)
    }
  }

  useEffect(() => {
    // Create and connect the socket only once when the component mounts
    const getSocket = async () => {
      const socket = await createSocket();
      setSocket(socket);
    }

    getSocket().catch(console.error);

    if (!socket) {
      return
    }

    // Listen for the connection to be established
    socket.on('connect', () => {
      console.log('Connected with socket ID:', socket.id);
      // socket.on(Messages.SEND_PLAYER_TURN, (turn: number) => {
      socket.on('send-player-turn', (turn: number) => {
        setPlayerTurn(turn)
      })
      setSocketId(socket.id);
    });

    // socket.on(Messages.UPDATE_GAME_STATE, (gameState: GameGridValueInterface, columnIndex: number) => {
    socket.on('update-game-state', (gameState: GameGridValueInterface, columnIndex: number) => {
      console.log(gameState);
      console.log(columnIndex);
      // Update game state function
      playMove(columnIndex)
    })

    // Listen for disconnection events
    socket.on('disconnect', () => {
      console.log('Disconnected');
      setSocketId(undefined);
      setPlayerTurn(undefined)
      setDisconnected(true)
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>{socketId ? `Socket ID: ${socketId}` : disconnected ? 'La partie est pleine :(' : 'Connexion en cours...'}</h1>
      <h2>{playerTurn && `${playerTurn}`}</h2>
      {/* {socket && <button className='w-16 h-12 p-4 bg-red-600' onClick={onClickSendPlayerAction}></button>} */}
      <Turn turn={gameState.turn} />
      <GameGrid gameGridValues={gameState} playMove={onClickSendPlayerAction} />
    </div>
  );
}
