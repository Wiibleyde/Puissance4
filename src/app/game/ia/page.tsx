"use client";
import { GameGrid } from "@/components/Game/GameGrid";
import { Turn } from "@/components/Turn/Turn";
import { useIAGame } from "@/hooks/useIAGame";

export default function GamePage() {
    const { gameState, playMove } = useIAGame();

    return (
        <div>
            <Turn turn={gameState.turn} />
            <GameGrid gameGridValues={gameState} playMove={playMove} />
        </div>
    );
}

