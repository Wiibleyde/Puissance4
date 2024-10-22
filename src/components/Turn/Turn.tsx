export enum TurnState {
    Player1,
    Player2
}

export function Turn({ turn }: { turn: TurnState }) {
    return (
        <div className={"text-2xl text-center p-4" + (turn === TurnState.Player1 ? " bg-red-500" : " bg-yellow-500") + " text-white rounded-2xl m-4 w-1/6 mx-auto"}>
            {turn === TurnState.Player1 ? "Player 1" : "Player 2"}'s turn
        </div>
    )
}