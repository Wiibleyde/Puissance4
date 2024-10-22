import { useState } from 'react';
import { CellState } from "@/components/Game/Cell";
import { initialGridValues } from '@/config';

export enum TurnState {
    Player1,
    Player2
}

export interface GameGridValueInterface {
    turn: TurnState;
    values: CellState[][];
}


export function useGame() {
    const [GameState, setGameState] = useState<GameGridValueInterface>({
        turn: TurnState.Player1,
        values: initialGridValues
    });

    const playMove = (columnIndex: number) => {
        const newGameState = { ...GameState };
        const columnValues = newGameState.values[columnIndex];

        const emptyCellIndex = columnValues.slice().reverse().findIndex(cellValue => cellValue === CellState.Empty);

        if (emptyCellIndex === -1) {
            return;
        }

        const actualEmptyCellIndex = columnValues.length - 1 - emptyCellIndex;

        columnValues[actualEmptyCellIndex] = newGameState.turn === TurnState.Player1 ? CellState.Player1 : CellState.Player2;

        setGameState(newGameState);
    }

    return { GameState, playMove };
}