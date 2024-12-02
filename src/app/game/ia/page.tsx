"use client";
import { GameGrid } from "@/components/Game/GameGrid";
import { Navbar } from "@/components/Navbar/Navbar";
import { Turn } from "@/components/Turn/Turn";
import { useIAGame } from "@/hooks/useIAGame";
import { WinnerPopup } from '@/components/WinnerPopup/WinnerPopup';

export default function GamePage() {
    const { gameState, playMove, winner, gameOver } = useIAGame();

    return (
        <div className="h-screen overflow-hidden">
            <Navbar />
            <div className="bg-gray-900 text-white flex flex-col items-center justify-center h-full relative">
                <div className="flex flex-col items-center justify-center h-full">
                    <Turn turn={gameState.turn} />
                    {gameOver && <h1 className="text-3xl font-bold mb-4">La partie est terminée !</h1>}
                    <GameGrid gameGridValues={gameState} playMove={playMove} />
                    {winner && <WinnerPopup winner={winner} />}
                </div>
            </div>
        </div>
    );
}

