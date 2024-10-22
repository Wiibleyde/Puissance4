import { useState } from 'react';
import { CellState } from "@/components/Game/Cell";
import { initialGridValues } from '@/config';
import { TurnState } from '@/components/Turn/Turn';

export interface GameGridValueInterface {
    turn: TurnState;
    values: CellState[][];
}

export function useIAGame() {
    const [gameState, setGameState] = useState<GameGridValueInterface>({
        turn: TurnState.Player1,
        values: initialGridValues
    });

    const getEmptyCellIndex = (columnValues: CellState[]) => {
        const emptyCellIndex = columnValues.slice().reverse().findIndex(cellValue => cellValue === CellState.Empty);
        return emptyCellIndex === -1 ? -1 : columnValues.length - 1 - emptyCellIndex;
    };

    const updateGameState = (columnValues: CellState[], actualEmptyCellIndex: number, player: CellState) => {
        columnValues[actualEmptyCellIndex] = player;
        setGameState((prevState) => ({
            ...prevState,
            values: [...prevState.values],
            turn: player === CellState.Player1 ? TurnState.Player2 : TurnState.Player1,
        }));
    };

    const checkWinner = () => {
        const { values } = gameState;

        for (let rowIndex = 0; rowIndex < values.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < values[rowIndex].length; columnIndex++) {
                const cellValue = values[rowIndex][columnIndex];
                if (cellValue === CellState.Empty) continue;

                const directions = [
                    [[0, 1], [0, 2], [0, 3]],
                    [[1, 0], [2, 0], [3, 0]],
                    [[1, 1], [2, 2], [3, 3]],
                    [[1, -1], [2, -2], [3, -3]]
                ];

                for (const direction of directions) {
                    if (direction.every(([dRow, dCol]) => {
                        const r = rowIndex + dRow, c = columnIndex + dCol;
                        return r < values.length && c < values[rowIndex].length && c >= 0 && values[r][c] === cellValue;
                    })) {
                        return cellValue;
                    }
                }
            }
        }

        return CellState.Empty;
    };

    const handleWin = (winner: CellState) => {
        alert(`Player ${winner === CellState.Player1 ? 1 : 2} wins!`);
        setGameState({
            turn: TurnState.Player1,
            values: initialGridValues
        });
    };

    const playMove = (columnIndex: number) => {
        const columnValues = gameState.values[columnIndex];
        const emptyCellIndex = getEmptyCellIndex(columnValues);
        if (emptyCellIndex === -1) return;

        const currentPlayer = gameState.turn === TurnState.Player1 ? CellState.Player1 : CellState.Player2;
        updateGameState(columnValues, emptyCellIndex, currentPlayer);

        const winner = checkWinner();
        if (winner !== CellState.Empty) handleWin(winner);
        else playLogicMove();
    };

    const playLogicMove = () => {
        const { values } = gameState;
        const emptyColumns = values.map((column, index) => ({
            index,
            count: column.filter(cellValue => cellValue === CellState.Empty).length
        })).filter(column => column.count > 0);

        const canWin = (player: CellState) => {
            for (const { index } of emptyColumns) {
                const columnValues = values[index];
                const emptyCellIndex = getEmptyCellIndex(columnValues);
                if (emptyCellIndex === -1) continue;

                columnValues[emptyCellIndex] = player;
                if (checkWinner() === player) {
                    columnValues[emptyCellIndex] = CellState.Empty;
                    return index;
                }
                columnValues[emptyCellIndex] = CellState.Empty;
            }
            return -1;
        };

        const winningMove = canWin(CellState.Player2);
        if (winningMove !== -1) {
            updateGameState(values[winningMove], getEmptyCellIndex(values[winningMove]), CellState.Player2);
            const winner = checkWinner();
            if (winner !== CellState.Empty) handleWin(winner);
            return;
        }

        const blockingMove = canWin(CellState.Player1);
        if (blockingMove !== -1) {
            updateGameState(values[blockingMove], getEmptyCellIndex(values[blockingMove]), CellState.Player2);
            const winner = checkWinner();
            if (winner !== CellState.Empty) handleWin(winner);
            return;
        }

        const randomColumnIndex = emptyColumns[Math.floor(Math.random() * emptyColumns.length)].index;
        updateGameState(values[randomColumnIndex], getEmptyCellIndex(values[randomColumnIndex]), CellState.Player2);
        const winner = checkWinner();
        if (winner !== CellState.Empty) handleWin(winner);
    };

    return { gameState, playMove, checkWinner };
}