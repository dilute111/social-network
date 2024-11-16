import React from 'react';
import {beachImg} from "../../App.js";
import classes from './ProfilePage.module.css';
import Post from "./MyPosts/Post";


const ProfilePage = () => {
    return (
        <div className={classes.content}>
            <div>
                <img src={beachImg} alt="logo"/>
            </div>
            <div className={classes.item}>
                ava + description
            </div>
            <Post />
        </div>
    )
}

export default ProfilePage