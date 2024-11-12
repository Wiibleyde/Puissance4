'use client';
import { createSocket, sendPlayerAction } from '@/app/api/websocket';
import { TurnState } from '@/components/Turn/Turn';
// import { TurnState } from '@/components/Turn/Turn';
import { useIAGame } from '@/hooks/useIAGame';
import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';


export default function GamePage() {
  const { gameState } = useIAGame();

  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [socketId, setSocketId] = useState<string | undefined>(undefined);
  const [playerTurn, setPlayerTurn] = useState<TurnState | undefined>(undefined);
  const [disconnected, setDisconnected] = useState<boolean>(false);

  // Probleme avec le setup du tour des joueurs
  const onClickSendPlayerAction = () => {
    console.log(playerTurn);
    if (socket && playerTurn) {
      sendPlayerAction(socket, gameState, playerTurn)
    } else {
      console.log("caca");
    }
  }

  useEffect(() => {
    // Create and connect the socket only once when the component mounts
    const socket = createSocket();
    setSocket(socket);

    // Listen for the connection to be established
    socket.on('connect', () => {
      console.log('Connected with socket ID:', socket.id);
      socket.on('send-player-turn', (turn: number) => {
        setPlayerTurn(turn)
      })
      setSocketId(socket.id);
    });

    // Listen for disconnection events
    socket.on('disconnect', () => {
      console.log('Disconnected');
      setSocketId(undefined);
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
      {socket && <button className='w-16 h-12 p-4 bg-red-600' onClick={onClickSendPlayerAction}></button>}
    </div>
  );
}
