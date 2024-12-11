import React from 'react';

import classes from './ProfilePage.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";


const ProfilePage = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts state={props.state}
                     newPostText={props.state.profilePage.newPostText}
                     dispatch={props.dispatch} />

        </div>
    )
}

export default ProfilePage