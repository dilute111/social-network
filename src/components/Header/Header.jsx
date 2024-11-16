import React from 'react';
import {source} from '../App.js'
import classes from './Header.module.css';

const Header = () => {
    return (
        <header className={classes.header}>
            <img src={source} alt="image"/>
        </header>
    )
}

export default Header