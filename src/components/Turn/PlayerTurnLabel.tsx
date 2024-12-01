import { TurnState } from "./Turn";


export function PlayerTurnLabel({ playerTurn }: { playerTurn: TurnState }) {
  return (
      <div className={"text-2xl text-center p-4" + (playerTurn === TurnState.Player1 ? " bg-red-500" : " bg-yellow-500") + " text-white rounded-2xl m-4 w-1/6 mx-auto"}>
          You are Player {playerTurn+1}
      </div>
  )
}