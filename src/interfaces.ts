import { CellState } from "./components/Game/Cell";
import { TurnState } from "./components/Turn/Turn";

export interface GameGridValueInterface {
    turn: TurnState;
    values: CellState[][];
}
