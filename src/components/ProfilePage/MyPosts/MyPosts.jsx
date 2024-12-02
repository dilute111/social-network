import React from 'react';
import classes from "./MyPosts.module.css";
import Post from "./Post";
import {avatar} from "../../../App";

const MyPosts = (props) => {

    let postsData =
        props.p.map(e => <Post image={avatar} message={e.message} likes={e.likesCount}/>)

    let newPostElement = React.createRef()
    const addPost = () => {

        let text = newPostElement.current.value;
        props.addPost(text)
    }
    return (
        <div className={classes.item}>
            <h3>My posts</h3>
            <div >
                <div>
                <textarea ref={newPostElement}></textarea>
                </div>
                <div>
                <button onClick={addPost}>add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                { postsData }
            </div>
        </div>
    );
};

export default MyPosts;