import React, {FC} from 'react';
import classes from './Header.module.css';
import {source} from "../../App";
import {NavLink} from "react-router-dom";
import {IHeaderProps} from "../../types/types";

const Header: FC<IHeaderProps> = ({login, isAuthorized, logout}) => {

    return (
        <div >
            <header className={classes.header}>
                <img src={source} alt="image"/>
                <div className={classes.loginBlock}>
                    { isAuthorized
                        ? <div> {login} - <button onClick={() => logout()}>Logout</button> </div>
                        : <NavLink to="/login">Login</NavLink>}
                </div>
            </header>
        </div>
    )
}

export default Header