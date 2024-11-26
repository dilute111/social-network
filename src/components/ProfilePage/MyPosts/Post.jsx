import React from 'react';
import classes from "./Post.module.css";

const Post = (props) => {
    return (

            <div className={classes.item}>
                <div className={classes.content}>
                    <img  src={props.image} alt="" />
                    <span> { props.message } </span>
                    <div>
                    <span> Like { props.likes } </span>
                    </div>
                </div>
        </div>
    );
};

export default Post;