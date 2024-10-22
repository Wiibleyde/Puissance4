export enum CellState {
    Player1,
    Player2,
    Empty
}

export enum CellWinState {
    WinnerCell,
    NotWinnerCell
}

export function Cell({ state, winnerState }: { state: CellState, winnerState: CellWinState }) {
    return (
        <div className={"w-16 h-16 rounded-full" + (state === CellState.Empty ? " bg-blue-900" : state === CellState.Player1 ? " bg-red-500" : " bg-yellow-500") + " border-4 " + (winnerState === CellWinState.WinnerCell ? "border-green-500" : "border-gray-200")}></div>
    )
}