import React from 'react';
import classes from './Friends.module.css';

const Friends = (props) => {

    return (
        <div className={classes.friends}>
            <div><img src={props.ava}/> {props.name}  </div>
        </div>
    );
};

export default Friends;