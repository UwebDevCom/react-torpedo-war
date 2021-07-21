import React, { createContext, useReducer } from 'react';

const initialState = {
    startNewGame: null,
    boardData: null,
    totalSubmarines: 0
}

const GameContext = createContext({
    startNewGame: false,
    boardData: null,
    totalSubmarines: 0,
    startNewGameFun: (data) => { }
});

function generateData(size) {
    const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
    const boardData = [];
    for (let i = 0; i < size; i++) {
        for (let u = 0; u < size; u++) {
            boardData.push({ id: u + '-' + abc[i], x: u, y: abc[i], dirty: false })
        }
    }
    return boardData;
}


function generateSubmarines(level, maxSize, data, boardSize) {

    let submarines = [];
    let dataBoard = [...data];
    
    while(submarines.length !== level) {
        let submarineSize = Math.ceil(Math.random() * maxSize);
        let randomSquare = Math.ceil(Math.random() * dataBoard.length) - 1;
        console.log(dataBoard[randomSquare])
        if (dataBoard[randomSquare]!==undefined && (boardSize - submarineSize >= dataBoard[randomSquare].x)) {
            let submarineDataSquare = [];
            let slicedDataOfSubmarine = dataBoard.splice(randomSquare, submarineSize , undefined);
            if (!slicedDataOfSubmarine.includes(undefined)){
            slicedDataOfSubmarine.forEach((item , i ,arr) => {
                if(arr.length> 1) {
                switch(i){
                    case 0:
                        item.ImgSubmarine = 'tail'
                        break;
                        case arr.length-1:
                        item.ImgSubmarine = 'head'
                        break;
                        default:
                            item.ImgSubmarine = 'middle'
                            break;
                    } 
                }else {
                    item.ImgSubmarine = 'one';
                }

                item.isSubmarine = true;
                submarineDataSquare.push(item);                
            });
        }
        if(submarineDataSquare.length >0){
            submarines.push({ id: data[randomSquare].id + 'sub', size: submarineSize, data: submarineDataSquare });
        }
        }
    }
    console.log(submarines)
    return submarines;
}

function totalSubmarinesFun(submarines){
    let totalSubmarines = 0;
    submarines.map(item=>{
    totalSubmarines = totalSubmarines + item.data.length 
});
    return totalSubmarines;
}

function gameReducer(state, action) {
    switch (action.type) {
        case 'START':
            let boardData = generateData(10, 2);
            let submarines = generateSubmarines(10, 6, boardData, 10);
            let totalSubmarines = totalSubmarinesFun(submarines);
            console.log(totalSubmarines)
            return {
                ...state,
                boardData,
                totalSubmarines,
                startNewGame: action.payload
            }
        default:
            return state
    }
};

function GameProvider(props) {
    const [state, dispatch] = useReducer(gameReducer, initialState);


    function startNewGameFun(value) {
        dispatch({
            type: 'START',
            payload: value
        });
    }
    return (
        <GameContext.Provider
            value={{ startNewGame: state.startNewGame, startNewGameFun, boardData: state.boardData , totalSubmarines: state.totalSubmarines }} {...props} />
    )
}

export { GameContext, GameProvider }