import React, {useContext, useState ,useEffect} from 'react';
import {GameContext} from '../context/context';
import './startTheGame.css';
import SetGameForm from './setGameForm';

 function StartTheGame() {
     const [isForm, removeForm] = useState(true);
     const {startNewGame} = useContext(GameContext);

        useEffect(() => {
            removeForm(true)
            if(startNewGame) {
                setTimeout(() => {
                    removeForm(false)
                },1000); 
            }      
        }, [startNewGame])

     
    return (
        <div className={startNewGame ? "gameStartContainer moveDown" :  "gameStartContainer moveTop"}>
           {isForm && <SetGameForm />  }   
        </div>
    )
}

export default StartTheGame;
