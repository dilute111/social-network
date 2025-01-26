import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import Friends from "./Friends/Friends";
import store from "../../redux/redux-store";


const Navbar = (props) => {
    let friendsElement =
        store.getState().messagesPage.d.slice(0, 3).map(e => <Friends id={e.id} name={e.name}
                                                                      ava={e.ava}/>)
    return (
             <nav className={classes.nav}>
               <NavLink to="/profile"> <div className={classes.item}>Profile</div></NavLink>
               <NavLink to="/messages"> <div className={classes.item}>Messages</div> </NavLink>
               <NavLink to="/users"> <div className={classes.item}>Users</div> </NavLink>
               <NavLink to="/news"> <div className={classes.item}>News</div> </NavLink>
               <NavLink to="/music"> <div className={classes.item}>Music</div> </NavLink>
               <NavLink to="/settings"> <div className={classes.item}>Settings</div> </NavLink>
               <NavLink to="/friends"> <div className={classes.item}>Friends </div>
                    <div className={classes.friends}>{friendsElement}
                        <span
                            className={classes.rest}>and {(store.getState().messagesPage.d.length - 3)} more</span>
                    </div>
                </NavLink>
             </nav>


    )
}

export default Navbar