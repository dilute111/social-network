import React from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';

import Friends from "./Friends/Friends";
import store from "../../redux/redux-store";


const Navbar = (props) => {
    let friendsElement =
        store.getState().messagesPage.d.slice(0, 3).map(e => <Friends id={e.id} name={e.name}
                                                                      ava={e.ava}/>)
    return (
             <nav className={classes.nav}>
               <Link to="/profile"> <div className={classes.item}>Profile</div></Link>
               <Link to="/messages"> <div className={classes.item}>Messages</div> </Link>
               <Link to="/users"> <div className={classes.item}>Users</div> </Link>
               <Link to="/news"> <div className={classes.item}>News</div> </Link>
               <Link to="/music"> <div className={classes.item}>Music</div> </Link>
               <Link to="/settings"> <div className={classes.item}>Settings</div> </Link>
               <Link to="/friends"> <div className={classes.item}>Friends </div>
                    <div className={classes.friends}>{friendsElement}
                        <span
                            className={classes.rest}>and {(store.getState().messagesPage.d.length - 3)} more</span>
                    </div>
                </Link>
             </nav>


    )
}

export default Navbar