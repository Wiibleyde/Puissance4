"use client";
import { GameGrid } from "@/components/Game/GameGrid";
import { useGame } from "@/hooks/useGame";

export default function GamePage() {
    const { gameState, playMove } = useGame();

    return (
        <div>
            <GameGrid gameGridValues={gameState} playMove={playMove} />
        </div>
    );
}

