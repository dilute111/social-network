import React from 'react';
import classes from "./MyPosts.module.css";
import Post from "./Post";
import {avatar} from "../../../App";
import {useForm} from "react-hook-form";

const MyPostsForm = (props) => {
    const {register, handleSubmit, reset} = useForm();

    const onSubmit = (data) => {
        props.onAddPost(data.newPostText); // Передаем текст в addPost
        reset(); // Очищаем форму
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea {...register("newPostText")} placeholder={"Enter your message"} />
            </div>
            <div>
                <button type={"submit"}>Add post</button>
            </div>
        </form>
    )
}

const MyPosts = (props) => {

    let postsData =
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