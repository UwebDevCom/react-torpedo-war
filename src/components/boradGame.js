import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/context';
import './boardGame.css';
import ImageOfSubmarine from './imageOfSubmarine';
import ImageOfIsland from './imageOfIsland';

function BoradGame() {
    const { boardData ,totalSubmarines , resultsDataFun ,cols, rows, strikesCount} = useContext(GameContext);
    const [count, setCount] = useState(0);
    const [widthSquareSize, setWidthSquareSize] = useState(0);
    const [showingBoard, setshowingBoard] = useState(false);
    const [isFinished, setGameStatus] = useState(false);
    const [timer, setTimer] = useState(5);
    
    const findSubmarines = (e,item) => {
        item.dirty = true;
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
        if(item.islnd){
            e.currentTarget.classList.add('isSub');
            e.currentTarget.classList.remove('clicked');
            item.isIslandFound = true;
        }

        resultsDataFun(item);
    }
    }
    useEffect(()=>{
        let startTimer = setInterval(()=>{
            setTimer((prev)=>prev-1) ;
            if (timer < 0 ) {
                clearInterval(startTimer);
            } 
        },1000);
        setTimeout(()=>{
            setshowingBoard(true);
            setTimer(0);
        },5000)
    },[])
    useEffect(()=>{
       
        if(strikesCount.length === 0) {
            setCount(0);
        }
        if (count === totalSubmarines){
            setGameStatus(true);
        }
        const squareWidth = document.querySelector('.gameKey').getBoundingClientRect().width;
        if(squareWidth > 0) {
            setWidthSquareSize(squareWidth);
        }    
    },[count,widthSquareSize,strikesCount])

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
    const cantClickOnIsland = (e,item) =>{
        if (e.currentTarget.classList.contains("clicked")){
            return null;
        }else {
        e.target.style.position = 'relative'
        let moveMotion = 30;
        const shakeIsland = setInterval(() => {
            moveMotion--;        
             e.target.style.transform = `translate(${moveMotion*(moveMotion%2 >0 ? -1: 1)}px)`;       
        if (moveMotion === 0) {
            clearInterval(shakeIsland);
        }
        });
        findSubmarines(e,item);
    }
}
    return (
        <>
         {!showingBoard ? <div class="clock-timer-container">
                            <span>{timer}</span>
                        </div>: null}
        <div className="board-container" style={{maxWidth: cols <= rows ? ((window.innerHeight/2)/rows) * cols+'px' : null  }}>
            <div className="left"></div>
            <div className="right"></div>
            <div className="top"></div>
            <div className="bottom"></div>

            {createAxises()}
            {
                boardData && boardData.map(item =>
                    <React.Fragment key={item.id}>
                    <button aria-live={item.isSubmarineFound ? "polite" : "off"} onClick={ !showingBoard || isFinished ? null :item.islnd ? (e)=>cantClickOnIsland(e, item) :  (e) => findSubmarines(e, item)}
                    data-id={item.id} className={!item.r ? "gameKey rhombus": isFinished ? "gameKey finishGameSquate" : "gameKey " +  (item.isSubmarineFound && item.isSubmarine  ? 'isSub' :  item.isSubmarineFound ? 'clicked' : '')} style={{flex:(100/cols)+'%', height: widthSquareSize+'px' }}
                    aria-label={item.x + item.y}>
                    {item.isSubmarine ? <ImageOfSubmarine hideShip={showingBoard} position={item.position} data={item} /> : item.islnd ? <ImageOfIsland hideIsland={showingBoard} />: null} </button>
                    </React.Fragment>)
            }
        </div> 
        {isFinished ? <div className="finishGame"><span>You Win</span><button onClick={()=>window.location.reload()}>Again</button></div> : null}
        </>
    )
}
export default BoradGame;