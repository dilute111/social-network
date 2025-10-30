import React, {FC} from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';
import Friends from "./Friends/FriendsContainer";


const Navbar: FC = () => {

    return (
             <nav className={classes.nav}>
               <Link to="/profile"> <div >Profile</div></Link>
               <Link to="/messages"> <div >Messages</div> </Link>
               <Link to="/users"> <div >Users</div> </Link>
               <Link to="/news"> <div >News</div> </Link>
               <Link to="/music"> <div >Music</div> </Link>
               <Link to="/settings"> <div >Settings</div> </Link>
               <Link to="/friends"> <div><Friends/></div></Link>
             </nav>


    )
}

export default Navbar