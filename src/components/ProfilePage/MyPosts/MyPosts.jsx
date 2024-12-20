import React from 'react';
import classes from "./MyPosts.module.css";
import Post from "./Post";
import {avatar} from "../../../App";




const MyPosts = (props) => {

    let postsData =
        props.posts.map(e => <Post image={avatar} message={e.message} likes={e.likesCount}/>)

    let newPostElement = React.createRef()

    const onAddPost = () => {
        props.addPost()
    }
    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);

    }

    return (
        <div className={classes.item}>
            <h3>My posts</h3>
            <div >
                <div>
                <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} />
                </div>
                <div>
                <button onClick={onAddPost}>add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                { postsData }
            </div>
        </div>
    );
};

export default MyPosts;