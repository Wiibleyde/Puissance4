"use client";
import { Cell, CellState } from './Cell'

export function Column({ columnValues, playMove }: { columnValues: CellState[], playMove: (columnIndex: number) => void }) {
    return (
        <div className="grid grid-rows-6 gap-4" onClick={() => playMove(columnValues.length - 1)}>
            {columnValues.map((cellValue, index) => (
                <Cell key={index} state={cellValue} />
            ))}
        </div>
    )
}