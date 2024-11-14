import { CellState } from "./components/Game/Cell";

export const gridConfig = {
    width: 7,
    height: 6,
}

export const initialGridValues = Array.from({ length: gridConfig.width }, () => Array.from({ length: gridConfig.height }, () => CellState.Empty));
