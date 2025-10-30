import React, {FC} from 'react';
import classes from "./MyPosts.module.css";
import Post from "./Post";
import {avatar} from "../../../App";
import {MyPostsStock} from "../../common/FormsControls/FormsControls";
import {IMyPostsProps, IMyPostsStockProps} from "../../../types/types";


const MyPostsForm: FC<IMyPostsStockProps> = (props) => {

    return (
        <MyPostsStock onAddPost={props.onAddPost} />
    )
}

const MyPosts: FC<IMyPostsProps> = (props) => {
    const postsData =
        [...props.posts]
            .reverse()
            .map((e, index) => <Post key={index} image={avatar} message={e.message} likes={e.likesCount}/>)

    const onAddPost = (text: string) => {
        props.updateNewPostText(text); // Обновляем текст
        props.addPost(text); // Отправляем пост
    };

    return (
        <div className={classes.item}>
            <h3>My posts</h3>
            <MyPostsForm onAddPost={onAddPost}/>
            <div className={classes.posts}>{postsData}</div>
        </div>
    );
}

const MyPostsMemoized = React.memo(MyPosts)

export default MyPostsMemoized;