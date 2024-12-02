import React from 'react';

import classes from './ProfilePage.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";


const ProfilePage = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts p={props.p} addPost={props.addPost}/>

        </div>
    )
}

export default ProfilePage