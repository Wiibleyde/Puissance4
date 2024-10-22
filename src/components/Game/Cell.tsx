export enum CellState {
    Player1,
    Player2,
    Empty
}

export function Cell({ state }: { state: CellState }) {
    return (
        <div className={"w-16 h-16 rounded-full" + (state === CellState.Empty ? " bg-gray-200" : state === CellState.Player1 ? " bg-red-500" : " bg-yellow-500")}>
        </div>
    )
}