import React from 'react';

import classes from './ProfilePage.module.css';
import {beachImg} from "../../../App";
import Post from "./Post";

const avatar = "https://i.pinimg.com/736x/fc/a2/21/fca2210d4ccac0da3119daf20f876a0d.jpg"

const ProfilePage = () => {
    return (
        <div className={classes.content}>
            <div>
                <img src={beachImg} alt="logo"/>
            </div>
            <div className={classes.item}>
                ava + description
            </div>
            <div className={classes.item}>
                My posts
                <div className={classes.item}>
                    New Post
                </div>
            </div>
            <div>
            <Post image={avatar} message="Hello, this is my first post"  likes="0"/>
            <Post image={avatar} message="Hi, how are you?"  likes="26"/>
            </div>
        </div>
    )
}

export default ProfilePage