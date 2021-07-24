import React, { createContext, useReducer } from 'react';
import { gameReducer } from './reducer';
const initialState = {
    startNewGame: null,
    submarines: null,
    submarines: null,
    boardData: null,
    level: null,
    totalSubmarines: 0 ,
    resultsData : null
}

const GameContext = createContext({
    startNewGame: false,
    submarines: initialState.submarines,
    boardData: initialState.boardData,
    totalSubmarines: initialState.totalSubmarines,
    level: initialState.level,
    startNewGameFun: (value) => { },
    resultsData: initialState.resultsData,
    resultsDataFun: (value) => { },
});



function GameProvider(props) {
    const [state, dispatch] = useReducer(gameReducer, initialState);


    function startNewGameFun(value) {
        dispatch({
            type: 'START',
            payload: value
        });
    }

    function resultsDataFun(value) {
        dispatch({
            type: 'RESULTS',
            payload: value
        });
    }
    return (
        <GameContext.Provider
            value={{ startNewGame: state.startNewGame,submarines: state.submarines, startNewGameFun,resultsDataFun,resultsData : state.resultsData,  boardData: state.boardData , totalSubmarines: state.totalSubmarines }} {...props} />
    )
}

export { GameContext, GameProvider }