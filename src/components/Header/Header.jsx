import React from 'react';

import classes from './Header.module.css';
import {source} from "../../App";

const Header = () => {
    return (
        <a href="/">
            <header className={classes.header}>
            <img src={source} alt="image"/>
        </header>
        </a>
    )
}

export default Header