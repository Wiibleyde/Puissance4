/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { createSocket, sendPlayerAction } from '@/websocket';
import { Turn, TurnState } from '@/components/Turn/Turn';
import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
// import { Messages } from '../../../../server';
import { GameGridValueInterface } from '@/interfaces';
import { useMultiplayerGame } from '@/hooks/useMultiplayerGame';
import { GameGrid } from '@/components/Game/GameGrid';
import { PlayerTurnLabel } from '@/components/Turn/PlayerTurnLabel';


export default function GamePage() {
  const { gameState, socketId, disconnected, onClickSendPlayerAction, playerTurn } = useMultiplayerGame();

  return (
    <div>
      <h1>{socketId ? `Socket ID: ${socketId}` : disconnected ? 'La partie est pleine :(' : 'Connexion en cours...'}</h1>
      {/* <h1>{playerTurn !== undefined && `You are PLAYER ${playerTurn+1}`}</h1> */}
      {!disconnected && playerTurn && <PlayerTurnLabel playerTurn={playerTurn} />}
      <Turn turn={gameState.turn} />
      <GameGrid gameGridValues={gameState} playMove={onClickSendPlayerAction} />
    </div>
  );
}
