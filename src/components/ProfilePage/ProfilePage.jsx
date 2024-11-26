import React from 'react';

import classes from './ProfilePage.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";


const ProfilePage = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts/>

        </div>
    )
}

export default ProfilePage