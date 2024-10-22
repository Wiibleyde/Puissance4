"use client";
import { GameGrid } from "@/components/Game/GameGrid";
import { useGame } from "@/hooks/useGame";

export default function GamePage() {
    const { GameState, playMove } = useGame();

    return (
        <div>
            <GameGrid gameGridValues={GameState} playMove={playMove} />
        </div>
    );
}

