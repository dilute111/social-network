import React from 'react';
import classes from "./Post.module.css";
import {FC} from "react";
import {IPostProps} from "../../../types/types";

const Post: FC<IPostProps> = ({image, message, likes}) => {
    return (

            <div className={classes.item}>
                <div className={classes.content}>
                    <img  src={image} alt="" />
                    <span> { message } </span>
                    <div>
                    <span> Like { likes } </span>
                    </div>
                </div>
        </div>
    );
};

export default Post;