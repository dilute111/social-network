import React from 'react';
import {beachImg} from "../App.js";


const ProfilePage = () => {
    return (
        <div className="content">
            <div>
                <img className="images" src={beachImg} alt="logo"/>
            </div>
            <div>
                ava + description
            </div>
            <div>
                My posts
                <div>
                    New Post
                </div>
                <div>
                    <div>
                        post 1
                    </div>
                    <div>
                        post 2
                    </div>
                    <div>
                        post 3
                    </div>
                    <div>
                        post 4
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage