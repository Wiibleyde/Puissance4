'use client';
import { createSocket, sendPlayerAction } from '@/websocket';
import { Turn, TurnState } from '@/components/Turn/Turn';
import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
// import { Messages } from '../../../../server';
import { GameGridValueInterface } from '@/interfaces';
import { useMultiplayerGame } from '@/hooks/useMultiplayerGame';
import { GameGrid } from '@/components/Game/GameGrid';


export default function GamePage() {
  const { gameState, playMove } = useMultiplayerGame();

  const socketRef = useRef<Socket | undefined>(undefined);
  const [socketId, setSocketId] = useState<string | undefined>(undefined);
  const [playerTurn, setPlayerTurn] = useState<TurnState | undefined>(undefined);
  const [disconnected, setDisconnected] = useState<boolean>(false);

  // TODO Ajouter fonction dans playMove de la grid
  const onClickSendPlayerAction = (columnIndex: number) => {
    if (socketRef.current && playerTurn !== undefined) {
      sendPlayerAction(socketRef.current, gameState, playerTurn, columnIndex)
    }
  }

  useEffect(() => {
    // Create and connect the socket only once when the component mounts
    const initializeSocket = async () => {
      const socket = await createSocket();
      socketRef.current = socket;

      socket.on('connect', () => {
        console.log('Connected with socket ID:', socket.id);
        setSocketId(socket.id);
        setDisconnected(false);
      });

      socket.on('send-player-turn', (turn: number) => {
        setPlayerTurn(turn);
      });

      socket.on('update-game-state', (newGameState: GameGridValueInterface, columnIndex: number) => {
        console.log(newGameState.turn);
        playMove(columnIndex); // Call playMove to update game state
      });

      socket.on('disconnect', () => {
        console.log('Disconnected');
        setSocketId(undefined);
        setPlayerTurn(undefined);
        setDisconnected(true);
      });
    };

    initializeSocket();

    // Clean up the socket connection when the component unmounts
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>{socketId ? `Socket ID: ${socketId}` : disconnected ? 'La partie est pleine :(' : 'Connexion en cours...'}</h1>
      <h1>{playerTurn !== undefined && `You are PLAYER ${playerTurn}`}</h1>
      {/* {socket && <button className='w-16 h-12 p-4 bg-red-600' onClick={onClickSendPlayerAction}></button>} */}
      <Turn turn={gameState.turn} />
      <GameGrid gameGridValues={gameState} playMove={onClickSendPlayerAction} />
    </div>
  );
}
