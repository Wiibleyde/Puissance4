"use client";
import { Cell, CellState } from './Cell'

/**
 * Represents a column in the game grid.
 *
 * @param {Object} props - The properties object.
 * @param {CellState[]} props.columnValues - An array of cell states representing the values in the column.
 * @param {(columnIndex: number) => void} props.playMove - A function to be called when a move is played in the column.
 *
 * @returns {JSX.Element} The rendered column component.
 */
export function Column({ columnValues, playMove }: { columnValues: CellState[], playMove: (columnIndex: number) => void }) {
    return (
        <div className="grid grid-rows-6 gap-4" onClick={() => playMove(columnValues.length - 1)}>
            {columnValues.map((cellValue, index) => (
                <Cell key={index} state={cellValue} />
            ))}
        </div>
    )
}