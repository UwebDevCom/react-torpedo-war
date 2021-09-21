import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/context';
import './boardGame.css';
import ImageOfSubmarine from './imageOfSubmarine';
import ImageOfIsland from './imageOfIsland';

function BoradGame() {
    const { boardData ,totalSubmarines , resultsDataFun ,cols, rows} = useContext(GameContext);
    const [count, setCount] = useState(0);
    const [widthSquareSize, setWidthSquareSize] = useState(0);
    const [isFinished, setGameStatus] = useState(false);
    
    const findSubmarines = (e,item) => {
        if(item.r){
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
    }
    
    useEffect(()=>{
        if (count === totalSubmarines){
            setGameStatus(true);
        }
        const squareWidth = document.querySelector('.gameKey').getBoundingClientRect().width;
        if(squareWidth > 0) {
            setWidthSquareSize(squareWidth);
        }    
    },[count,widthSquareSize])

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
                {<div className="y-axis">{y.map(y=><span key={y}><span className="inner-y-axis">{y}</span></span>)}</div>}
            </>
        )
    }
    const cantClickOnIsland = (e) =>{
        e.target.style.position = 'relative'
        let moveMotion = 30;
        const shakeIsland = setInterval(() => {
            moveMotion--;        
             e.target.style.transform = `translate(${moveMotion*(moveMotion%2 >0 ? -1: 1)}px)`;       
        if (moveMotion === 0) {
            clearInterval(shakeIsland)
        }
        });
    }
    return (
        <>
        
        <div className="board-container" style={{maxWidth: cols <= rows ? ((window.innerHeight/2)/rows) * cols+'px' : null }}>
            <div className="left"></div>
            <div className="right"></div>
            <div className="top"></div>
            <div className="bottom"></div>

            {createAxises()}
            {
                boardData && boardData.map(item =>
                    <React.Fragment key={item.id}>
                    <button aria-live={item.isSubmarineFound ? "polite" : "off"} onClick={isFinished ? null :item.islnd ? (e)=>cantClickOnIsland(e) :  (e) => findSubmarines(e, item)}
                    data-id={item.id} className={!item.r ? "gameKey rhombus": isFinished ? "gameKey finishGameSquate" : "gameKey"} style={{flex:(100/cols)+'%', height: widthSquareSize+'px' }}
                    aria-label={item.x + item.y}>
                    {item.isSubmarine ? <ImageOfSubmarine position={item.position} data={item} /> : item.islnd ? <ImageOfIsland />: null} </button>
                    </React.Fragment>)
            }
        </div> 
        {isFinished ? <div className="finishGame"><span>You Win</span><button onClick={()=>window.location.reload()}>Again</button></div> : null}
        </>
    )
}
export default BoradGame;