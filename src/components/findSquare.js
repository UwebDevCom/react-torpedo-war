import React, { useReducer, useContext } from 'react';
import { GameContext } from '../context/context';

import './findSquare.css';


const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function FindSquare(props) {
    const [formData, setFormData] = useReducer(formReducer, {});
    const { fireSquareByForm } = useContext(GameContext);

    const dataRef = () => {
        fireSquareByForm(formData);
        document.getElementById('fireForm').reset();
    };
    const choosenDataSquareByForm = (event) => {
        setFormData({
            name: event.target.name,
            value: (/[a-zA-Z]/).test(event.target.value) ? event.target.value.toUpperCase() : +event.target.value
        });
        const maxLength = parseInt(event.target.attributes["maxlength"].value, 10);
        const myLength = event.target.value.length;

        if (myLength >= maxLength) {
            while (event.target = event.target.nextElementSibling) {
                if (event.target == null)
                    break;
                if (event.target.tagName.toLowerCase() === "input" || event.target.tagName.toLowerCase() === "button") {
                    event.target.focus();
                    break;
                }
            }
        }
    };

    return (
        <>
                <form className="squareTargetForm" id="fireForm">
            <div className="findSquareContainer">
                <input onChange={choosenDataSquareByForm} type="text" name="xAxis" maxLength="1" pattern="[0-9]" />
                <input onChange={choosenDataSquareByForm} type="text" name="yAxis" maxLength="1" pattern="[A-Za-z]" />
                <button onClick={dataRef} className="squareTargetBtn" type="button">FIRE</button>
            </div>
        </form>
        <div role="alert" className="showShotCordinates">
                <span>{formData.xAxis}</span>
                <span>{formData.yAxis}</span>
            </div> 
        </>
    )
}
export default FindSquare;
