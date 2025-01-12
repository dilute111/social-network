import React from 'react';
import classes from './Header.module.css';
import {source} from "../../App";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <a href="/">
            <header className={classes.header}>
                <img src={source} alt="image"/>
                <div className={classes.loginBlock}>
                    { props.isAuthorized ? props.login : <NavLink to="/login">Login</NavLink>}
                </div>
            </header>
        </a>
    )
}

export default Header