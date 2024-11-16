import React from 'react';
import classes from "../ProfilePage.module.css";

const MyPosts = () => {
    return (
        <div className={classes.item}>
            My posts
            <div className={classes.item}>
                New Post
            </div>
            <div className={classes.item}>
                <div>
                    post 1
                </div>
                <div className={classes.item}>
                    post 2
                </div>
                <div className={classes.item}>
                    post 3
                </div>
                <div className={classes.item}>
                    post 4
                </div>
            </div>
        </div>
    );
};

export default MyPosts;