import { useEffect, useRef, useState } from 'react';
import { CellState } from "@/components/Game/Cell";
import { initialGridValues } from '@/config';
import { TurnState } from '@/components/Turn/Turn';
import { GameGridValueInterface } from '@/interfaces';
import { Socket } from 'socket.io-client';
import { createSocket, sendPlayerAction } from '@/websocket';

/**
 * Custom hook to manage the game state and logic for a Connect Four game with a multiplayer mode.
 *
 * @returns {Object} An object containing the current game state,  a function to play a move, and a function to check for a winner.
 * @property {GameGridValueInterface} gameState - The current state of the game grid and the current player's turn.
 * @property {string} socketId - The id of the current client socket
 * @property {boolean} disconnected - The connection status of the player
 * @property {function} onClickSendPlayerAction - Function to send the player action to the server and update the state if the player turn is according to the gameStateTurn.
 * @property {TurnState} playerTurn - The turn associated to the player based on an Enum.
 *
 * @example
 * const { gameState, socketId, disconnected, onClickSendPlayerAction, playerTurn } = useMultiplayerGame();
 *
 * // To play a move in column 3
 * playMove(3);
 *
 * // To check if there is a winner
 * const winner = checkWinner();
 */
export function useMultiplayerGame() {
    const [gameState, setGameState] = useState<GameGridValueInterface>({
        turn: TurnState.Player1,
        values: initialGridValues
    });

    // Define a gameState reference to use the gameState without re-rendering the component and persistint it inside the custom hook 
    const gameStateRef = useRef<GameGridValueInterface>(gameState);
    
    const socketRef = useRef<Socket | undefined>(undefined);
    const [socketId, setSocketId] = useState<string | undefined>(undefined);
    const [playerTurn, setPlayerTurn] = useState<TurnState | undefined>(undefined);
    const [disconnected, setDisconnected] = useState<boolean>(false);
    const [winner, setWinner] = useState<CellState | undefined>(undefined);
    const [gameOver, setGameOver] = useState<boolean>(false);

    // function that sends the player action to the server 
    const onClickSendPlayerAction = (columnIndex: number) => {
      if (socketRef.current && playerTurn !== undefined) {
        sendPlayerAction(socketRef.current, gameStateRef.current, playerTurn, columnIndex)
      }
    }

    // useEffect that creates the client socket and defines the socket listening events 
    useEffect(() => {
      const initializeSocket = async () => {
        const socket = await createSocket();
        socketRef.current = socket;

        // sets the client socketId and update player status to connected when the socket is succesfully connected to the server
        socket.on('connect', () => {
          console.log('Connected with socket ID:', socket.id);
          setSocketId(socket.id);
          setDisconnected(false);
        });

        // sets the player turn when the server sends the 'send-player-turn' event to the client socket
        socket.on('send-player-turn', (turn: number) => {
          setPlayerTurn(turn);
        });

        // calls playMove to update game state when the server sends the 'update-game-state' event to the client socket
        socket.on('update-game-state', (columnIndex: number) => {
          playMove(columnIndex);
        });

        socket.on('disconnect', () => {
          console.log('Disconnected');
          setSocketId(undefined);
          setPlayerTurn(undefined);
          setDisconnected(true);
        });
      };

      initializeSocket();

      // Disconnect the socket when the component is unmounted
      return () => {
        socketRef.current?.disconnect();
      };
    }, []);

    const getEmptyCellIndex = (columnValues: CellState[]) => {
        const emptyCellIndex = columnValues.slice().reverse().findIndex(cellValue => cellValue === CellState.Empty);
        return emptyCellIndex === -1 ? -1 : columnValues.length - 1 - emptyCellIndex;
    };

    const updateGameState = (columnValues: CellState[], actualEmptyCellIndex: number, player: CellState) => {
        columnValues[actualEmptyCellIndex] = player;
        const newGameState = {
          ...gameStateRef.current,
          values: [...gameStateRef.current.values],
          turn: player === CellState.Player1 ? TurnState.Player2 : TurnState.Player1,
        }
        setGameState(newGameState)
        gameStateRef.current = newGameState
    };

    const checkWinner = () => {
        const { values } = gameStateRef.current;

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

    // function that resets the gameState on a player win and display an alertPopup
    const handleWin = (winner: CellState) => {
        setWinner(winner);
        setGameOver(true);
    };

    const playMove = (columnIndex: number) => {
        const columnValues = gameStateRef.current.values[columnIndex];
        const emptyCellIndex = getEmptyCellIndex(columnValues);
        if (emptyCellIndex === -1) return;

        const currentPlayer = gameStateRef.current.turn === TurnState.Player1 ? CellState.Player1 : CellState.Player2;
        updateGameState(columnValues, emptyCellIndex, currentPlayer);

        const winner = checkWinner();
        if (winner !== CellState.Empty) handleWin(winner);
    };

    return { gameState, socketId, disconnected, onClickSendPlayerAction, playerTurn, winner, gameOver };
}
