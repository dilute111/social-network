import React, {FC} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {IProfilePageProps} from "../../types/types";



const ProfilePage: FC<IProfilePageProps> = ({profile, isOwner, status, updateStatus, savePhoto, saveProfile,}) => {
    return (
        <div>
            <ProfileInfo profile={profile}
                         isOwner={isOwner}
                         status={status}
                         updateStatus={updateStatus}
                         savePhoto={savePhoto}
                         saveProfile={saveProfile}
            />
            <MyPostsContainer  />

        </div>
    )
}

export default ProfilePage