import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/context';
import './boardGame.css';
import ImageOfSubmarine from './imageOfSubmarine';

function BoradGame() {
    const { boardData ,totalSubmarines , resultsDataFun} = useContext(GameContext);
    const [count, setCount] = useState(0);
    const [isFinished, setGameStatus] = useState(false);
    
    const findSubmarines = (e,item) => {
        if (e.currentTarget.classList.contains("clicked")){
            return null
        }
        e.preventDefault();
        e.currentTarget.classList.add('clicked');
        if(item.isSubmarine){
            setCount(count+1);
            item.isSubmarineFound = true;
            e.currentTarget.classList.add('isSub');
        }
        resultsDataFun(item);
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
            if (item.y === 'A') {
                x.push(item.x);
            }
        })
        return (
            <>
                {<div className="x-axis">{x.map(x=><span key={x}>{x}</span>)}</div>}
                {<div className="y-axis">{y.map(y=><span key={y}><span class="inner-y-axis">{y}</span></span>)}</div>}
            </>
        )
    }

    return (
        <>
        {!isFinished ?
        <div className="board-container">
            <div className="left"></div>
            <div className="right"></div>
            <div className="top"></div>
            <div className="bottom"></div>

            {createAxises()}
            {
                boardData && boardData.map(item =>
                    <React.Fragment  key={item.id}>
                    <button aria-live={item.isSubmarineFound ? item.x + item.y : null} onClick={(e) => findSubmarines(e, item)}
                    data-id={item.id} className="gameKey"
                    aria-label={item.x + item.y}>
                    {item.isSubmarine ? <ImageOfSubmarine data={item} /> : null} </button>
                    </React.Fragment>)
            }
        </div> : <div className="finishGame"><span>You Win</span><button onClick={()=>window.location.reload()}>Again</button></div>}
        </>
    )
}
export default BoradGame;