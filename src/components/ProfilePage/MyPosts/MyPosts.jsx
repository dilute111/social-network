import React from 'react';
import classes from "./MyPosts.module.css";
import Post from "./Post";
import {avatar} from "../../../App";
import {MyPostsStock} from "../../common/FormsControls/FormsControls";


const MyPostsForm = (props) => {

    return (
        <MyPostsStock onAddPost={props.onAddPost} />
    )
}

const MyPosts = (props) => {

    const postsData =
        props.posts.map(e => <Post image={avatar} message={e.message} likes={e.likesCount}/>)

    const onAddPost = (text) => {
        props.updateNewPostText(text); // Обновляем текст
        props.addPost(); // Отправляем пост
    };

    return (
        <div className={classes.item}>
            <h3>My posts</h3>
            <MyPostsForm onAddPost={onAddPost}/>
            <div className={classes.posts}>{postsData}</div>
        </div>
    );
};

export default MyPosts;