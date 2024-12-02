export enum TurnState {
    Player1,
    Player2
}

/**
 * Component to display the current player's turn.
 *
 * @param {Object} props - The component props.
 * @param {TurnState} props.turn - The current turn state, indicating which player's turn it is.
 * @returns {JSX.Element} A styled div element indicating the current player's turn.
 */
export function Turn({ turn }: { turn: TurnState }) {
    return (
        <div className={"text-2xl text-center p-4 shadow-lg" + (turn === TurnState.Player1 ? " bg-red-600" : " bg-yellow-600") + " text-white rounded-2xl m-4 w-auto mx-auto"}>
            {turn === TurnState.Player1 ? "Tour du Joueur 1" : "Tour du Joueur 2"}
        </div>
    )
}