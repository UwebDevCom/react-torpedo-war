import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/context';
import './boardGame.css';
import ImageOfSubmarine from './imageOfSubmarine';

function BoradGame() {
    const { boardData ,totalSubmarines} = useContext(GameContext);
    const [count, setCount] = useState(0);
    const [isFinished, setGameStatus] = useState(false);
    
    const findSubmarines = (e,isSub, id) => {
        if (e.currentTarget.classList.contains("clicked")){
            return null
        }
        e.preventDefault();
        e.currentTarget.classList.add('clicked');
        if(isSub){
            setCount(count+1);
        e.currentTarget.classList.add('isSub');
        alert('strike!, '+ id)
        }
    }
    useEffect(()=>{
        if (count === totalSubmarines){
            setGameStatus(true);
        }
    },[count])

    const createAxises = () => {
        let x = [];
        let y = [];
        boardData.map(item=>{
            if (item.x === 0) {
                y.push(item.y);
            }
            if (item.y === 'a') {
                x.push(item.x);
            }
        })
        return (
            <>
                {<div className="x-axis">{x.map(x=><span key={x}>{x}</span>)}</div>}
                {<div className="y-axis">{y.map(y=><span key={y}>{y}</span>)}</div>}
            </>
        )
    }

    return (
        <>
        {!isFinished ?
        <div className="board-container">
            
            {createAxises()}
            {
                boardData && boardData.map(item =>
                    <>
                    <button onClick={(e) => findSubmarines(e, item.isSubmarine, item.id)}
                    key={item.id} data-id={item.id} className="gameKey"
                    aria-level={item.x + item.y}>
                    {item.isSubmarine ? <ImageOfSubmarine data={item} /> : null} </button>
                    </>)
            }
        </div> : <div className="finishGame"><span>You Win</span><button onClick={()=>window.location.reload()}>Again</button></div>}
        </>
    )
}
export default BoradGame;