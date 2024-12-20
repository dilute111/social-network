import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import Friends from "./Friends/Friends";

import {Provider} from "react-redux";
import store from "../../redux/redux-store";


const Navbar = (props) => {
    let friendsElement =
        store.getState().messagesPage.d.slice(0, 3).map(e => <Friends id={e.id} name={e.name}
                                                                      ava={e.ava}/>)
    return (
                     <nav className={classes.nav}>
                        <div className={classes.item}><NavLink to="/profile">Profile</NavLink></div>
                        <div className={classes.item}><NavLink to="/messages">Messages</NavLink></div>
                        <div className={classes.item}><NavLink to="/news">News</NavLink></div>
                        <div className={classes.item}><NavLink to="/music">Music</NavLink></div>
                        <div className={classes.item}><NavLink to="/settings">Settings</NavLink></div>
                        <div className={classes.item}><NavLink to="/friends">Friends
                            <div className={classes.friends}>{friendsElement}
                                <span
                                    className={classes.rest}>and {(store.getState().messagesPage.d.length - 3)} more</span>
                            </div>
                        </NavLink></div>
                    </nav>


    )
}

export default Navbar