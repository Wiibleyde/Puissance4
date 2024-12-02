'use client';
import { Turn } from '@/components/Turn/Turn';
import { useMultiplayerGame } from '@/hooks/useMultiplayerGame';
import { GameGrid } from '@/components/Game/GameGrid';
import { PlayerTurnLabel } from '@/components/Turn/PlayerTurnLabel';
import { Navbar } from '@/components/Navbar/Navbar';
import { WinnerPopup } from '@/components/WinnerPopup/WinnerPopup';

export default function GamePage() {
  const { gameState, socketId, disconnected, onClickSendPlayerAction, playerTurn, winner, gameOver } = useMultiplayerGame();

  return (
    <div className="h-screen overflow-hidden bg-gray-900">
      <Navbar />
      <div className="bg-gray-900 text-white flex flex-col items-center justify-center h-full relative">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-bold mb-4">{disconnected ? 'Erreur de connexion à la partie' : ''}</h1>
          <h1 className="text-3xl font-bold mb-4">{socketId ? '' : 'Connexion en cours...'}</h1>
          {gameOver && winner != undefined && <WinnerPopup winner={winner} />} 
          {!disconnected && playerTurn != undefined && <PlayerTurnLabel playerTurn={playerTurn} />}
          <Turn turn={gameState.turn} />
          <GameGrid gameGridValues={gameState} playMove={onClickSendPlayerAction} />
        </div>
        {socketId && <div className="absolute bottom-2 right-2 text-xs text-gray-700">ID de Socket : {socketId}</div>}
      </div>
    </div>
  );
}
