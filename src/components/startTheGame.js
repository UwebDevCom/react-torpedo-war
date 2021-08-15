import React, {useState, useContext ,useEffect} from 'react';
import {GameContext} from '../context/context';
import './startTheGame.css';
import SetGameForm from './setGameForm';

 function StartTheGame() {

     const {startNewGame} = useContext(GameContext);
    return (
        <div className={startNewGame ? "gameStartContainer moveDown" :  "gameStartContainer moveTop"}>
            <SetGameForm />    
        </div>
    )
}

export default StartTheGame;
