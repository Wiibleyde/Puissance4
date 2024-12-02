import { TurnState } from "./Turn";

export function PlayerTurnLabel({ playerTurn }: { playerTurn: TurnState }) {
  return (
      <div className={"text-2xl text-center p-4 shadow-lg" + (playerTurn === TurnState.Player1 ? " bg-red-600" : " bg-yellow-600") + " text-white rounded-2xl m-4 w-1/4 mx-auto"}>
          Vous êtes le Joueur {playerTurn+1}
      </div>
  )
}