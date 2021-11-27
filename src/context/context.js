import React, { createContext, useReducer } from 'react';
import { gameReducer } from './reducer';
const initialState = {
    startNewGame: null,
    submarines: null,
    numberOfShips : null,
    boardData: null,
    level: null,
    rows: null,
    cols: null,
    shape: null,
    islands: null,
    totalSubmarines: 0,
    resultsData: null,
    fireSquareByForm: null,
    strikesCount:[],
    gamesTableResults : []
}

const GameContext = createContext({
    startNewGame: false,
    submarines: initialState.submarines,
    numberOfShips: initialState.numberOfShips,
    boardData: initialState.boardData,
    totalSubmarines: initialState.totalSubmarines,
    level: initialState.level,
    rows: initialState.rows,
    cols: initialState.cols,
    shape: initialState.shape,
    islands: initialState.islands,
    startNewGameFun: (value) => { },
    resultsData: initialState.resultsData,
    resultsDataFun: (value) => { },
    startTheGameAgainFun: (value) => { },
    fireSquareByForm : (value) => { },
    clearBoard : (value) => { },
    strikesCount: initialState.strikesCount,
    gamesTableResults: initialState.gamesTableResults
});



function GameProvider(props) {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    function setNewGameData(value,submarinesLimit) {
        dispatch({
            type: 'SET',
            payload: value
        });
    }

    function startNewGameFun(value) {
        dispatch({
            type: 'START',
            payload: value
        });
    }

    function fireSquareByForm(value) {
        dispatch({
            type: 'FIRE',
            payload: value
        });
    }

    function resultsDataFun(value) {
        dispatch({
            type: 'RESULTS',
            payload: value
        });
    }

    function clearBoard(value) {
        dispatch({
            type: 'CLEAR',
            payload: value
        });
    }

    function startTheGameAgainFun(value) {
        dispatch({
            type: 'AGAIN',
            payload: value
        });
    }


    return (
        <GameContext.Provider
            value={{cols: state.cols, rows: state.rows, startNewGame: state.startNewGame, submarines: state.submarines, setNewGameData, startNewGameFun, resultsDataFun,startTheGameAgainFun,clearBoard,fireSquareByForm, resultsData: state.resultsData, strikesCount: state.strikesCount, boardData: state.boardData, totalSubmarines: state.totalSubmarines,gamesTableResults: state.gamesTableResults }} {...props} />
    )
}

export { GameContext, GameProvider }