import { CellState } from "@/components/Game/Cell";
import { GameGrid } from "@/components/Game/GameGrid";
import { gridConfig } from "@/config";

export interface GameGridValueInterface {
    values: CellState[][];
}

export default function GamePage() {
    const GameGridValues: GameGridValueInterface = {
        values: Array.from({ length: gridConfig.height }).map(() => Array.from({ length: gridConfig.width }).map(() => CellState.Empty)),
    }

    return (
        <div>
            <GameGrid gameGridValues={GameGridValues} />
        </div>
    );
}

