import React from 'react';
import classes from './Header.module.css';
import {source} from "../../App";
import {NavLink} from "react-router-dom";

const Header = (props) => {

    return (
        <div >
            <header className={classes.header}>
                <img src={source} alt="image"/>
                <div className={classes.loginBlock}>
                    { props.isAuthorized
                        ? <div> {props.login} - <button onClick={() => props.logout()}>Logout</button> </div>
                        : <NavLink to="/login">Login</NavLink>}
                </div>
            </header>
        </div>
    )
}

export default Header