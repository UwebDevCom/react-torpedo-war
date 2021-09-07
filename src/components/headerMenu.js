import React from 'react'
import logo from '../logo.png'
 function HeaderMenu({toggleResults , isShow}) {
    return (
        <div className="menuHeader">
            <div className="logo">
                <img src={logo} alt="logo torpedo battle" />
            </div>
            <ul>
                <li><button onClick={()=>toggleResults(!isShow)}>RESULTS</button></li>
            </ul>
        </div>
    )
}
export default HeaderMenu;