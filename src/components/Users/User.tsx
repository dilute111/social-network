import React, {FC} from 'react';
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import classes from "./Users.module.css"
import {IUserComponent} from "../../types/types";


const User: FC<IUserComponent> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
                <span>
                    <div className={classes.users}>
                        <NavLink to={`/profile/${user.id}`}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} alt=""/>
                            </NavLink>
                    </div>
                    <div>
                        {user.followed ?
                            <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                unfollow(user.id)
                            }}>Unfollow</button> :
                            <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                follow(user.id)
                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                        <div>{user.name}</div><div>{user.status}</div>
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"}</div>
                </span>
        </div>)
}

export default User;