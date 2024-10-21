import { GameGridValueInterface } from "@/app/game/page"
import { Cell } from "./Cell"

export function GameGrid({ gameGridValues }: { gameGridValues: GameGridValueInterface }) {
    return (
        <div className="grid grid-cols-7 gap-4">
            {gameGridValues.values.map((line, lineIndex) => (
                line.map((cell, columnIndex) => (
                    <Cell key={columnIndex} state={cell} />
                ))
            ))}
        </div>
    )
}
