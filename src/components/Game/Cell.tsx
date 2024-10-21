export enum CellState {
    Empty,
    Player1,
    Player2,
}

export function Cell({ state }: { state: CellState }) {
    return (
        <div className={"w-16 h-16" + (state === CellState.Empty ? " bg-gray-200" : state === CellState.Player1 ? " bg-red-500" : " bg-yellow-500")}>
        </div>
    )
}