import React, {useState, useContext ,useEffect} from 'react';
import {GameContext} from '../context/context';
import './startTheGame.css';

 function StartTheGame() {

     const {startNewGameFun, startNewGame} = useContext(GameContext);
    const [playNow, setTheGame] = useState(false);
    
    useEffect(() => {
        
        startNewGameFun(playNow);
        
    },[playNow])
    return (
        <div className={playNow ? "gameStartContainer moveDown" :  "gameStartContainer moveTop"}>
            <span>Srart The Game</span>
            <button className={playNow ? "displayNone" : "startButton"} onClick={()=>setTheGame(!playNow)}>START</button>
        </div>
    )
}

export default StartTheGame;
