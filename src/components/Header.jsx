import React from 'react';
import {source} from '../App.js'

const Header = () => {
    return (
        <header className="header">
            <img className="images1" src={source} alt="image"/>
        </header>
    )
}

export default Header