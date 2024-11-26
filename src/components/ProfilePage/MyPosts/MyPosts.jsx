import React from 'react';
import classes from "./MyPosts.module.css";
import Post from "./Post";
import {avatar} from "../../../App";

const MyPosts = (props) => {
    let p = [
        {id: 1, message: "Hello, this is my first post", likesCount: 12},
        {id: 2, message: "Hi, how are you?", likesCount: 0},
        {id: 3, message: "Blabla", likesCount: 26},
        {id: 4, message: "Yo", likesCount: 6},
        {id: 5, message: "Hello", likesCount: 1},

    ]
    let postsData =
        p.map(e => <Post image={avatar} message={e.message} likes={e.likesCount}/>)

    return (
        <div className={classes.item}>
            <h3>My posts</h3>
            <div >
                <div>
                <textarea></textarea>
                </div>
                <div>
                <button>add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                { postsData }
            </div>
        </div>
    );
};

export default MyPosts;