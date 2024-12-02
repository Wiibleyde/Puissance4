export enum CellState {
    Player1,
    Player2,
    Empty
}

/**
 * Represents a single cell in the game grid.
 *
 * @param {Object} props - The properties object.
 * @param {CellState} props.state - The current state of the cell.
 * @returns {JSX.Element} The rendered cell component.
 */
export function Cell({ state }: { state: CellState }) {
    return (
        <div className={"w-16 h-16 rounded-full bg-gray-900"}>
            <div className={"w-full h-full rounded-full transform transition-transform duration-500 ease-in-out" + (state === CellState.Empty ? " bg-gray-900" : state === CellState.Player1 ? " bg-red-600 animate-fall" : " bg-yellow-600 animate-fall")}></div>
        </div>
    )
}