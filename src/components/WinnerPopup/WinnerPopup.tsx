
import React from 'react';
import { CellState } from '@/components/Game/Cell';
import { Trophy } from '../Vect/Trophy';

interface WinnerPopupProps {
    winner: CellState;
}

export const WinnerPopup: React.FC<WinnerPopupProps> = ({ winner }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4 text-white">Le joueur {winner === CellState.Player1 ? 1 : 2} a gagné !</h2>
                <div className='items-center justify-center my-5 animate-spin-slow'>
                    <Trophy />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={() => window.location.reload()}>
                    Rejouer
                </button>
            </div>
        </div>
    );
};