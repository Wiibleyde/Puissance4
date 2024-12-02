import { GameGridValueInterface } from "@/interfaces";
import { Column } from "./Column"

/**
 * Renders the game grid for the Connect Four game.
 *
 * @param {Object} props - The properties object.
 * @param {GameGridValueInterface} props.gameGridValues - The values representing the current state of the game grid.
 * @param {function} props.playMove - The function to call when a move is played, which takes the column index as an argument.
 * @returns {JSX.Element} The rendered game grid component.
 */
export function GameGrid({ gameGridValues, playMove }: { gameGridValues: GameGridValueInterface, playMove: (columnIndex: number) => void }) {
    return (
        <div className="overflow-x-auto">
            <div className="grid grid-cols-7 gap-4 bg-gray-800 p-4 w-full max-w-4xl mx-auto rounded-lg shadow-lg sm:grid-cols-7 sm:gap-4 sm:p-4 sm:max-w-full">
                {gameGridValues.values.map((columnValues, index) => (
                    <Column key={index} columnValues={columnValues} playMove={() => playMove(index)} />
                ))}
            </div>
        </div>
    )
}
