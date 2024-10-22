import { GameGridValueInterface } from "@/hooks/useGame";
import { Column } from "./Column"

export function GameGrid({ gameGridValues, playMove }: { gameGridValues: GameGridValueInterface, playMove: (columnIndex: number) => void }) {
    return (
        <div className="grid grid-cols-7 gap-4 bg-blue-700 p-4 w-1/3 mx-auto">
            {gameGridValues.values.map((columnValues, index) => (
                <Column key={index} columnValues={columnValues} playMove={() => playMove(index)} />
            ))}
        </div>
    )
}
