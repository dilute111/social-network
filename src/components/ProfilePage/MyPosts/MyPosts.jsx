import React from 'react';
import classes from "./MyPosts.module.css";
import Post from "./Post";
import {avatar} from "../../../App";
import {addPostActionCreator, updateNewPostActionCreator} from "../../../redux/profile-reducer";




const MyPosts = (props) => {

    let postsData =
        props.state.profilePage.p.map(e => <Post image={avatar} message={e.message} likes={e.likesCount}/>)

    let newPostElement = React.createRef()

    const addPost = () => {
        props.dispatch( addPostActionCreator() );
    }
    let onPostChange = () => {
        let text = newPostElement.current.value;
        let action = updateNewPostActionCreator(text);
        props.dispatch( action )
    }

    return (
        <div className={classes.item}>
            <h3>My posts</h3>
            <div >
                <div>
                <textarea onChange={onPostChange} ref={newPostElement} value={props.state.profilePage.newPostText} />
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