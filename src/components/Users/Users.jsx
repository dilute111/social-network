import React from 'react';
import classes from "./Users.module.css";
import axios from "axios";
import userPhoto from "../../assets/images/user.png"

const Users = (props) => {
    let a = "https://avatars.yandex.net/get-music-content/9838169/7e19a440.a.26720548-1/400x400"
    if (props.users.length === 0) {
        fetch("https://social-network.samuraijs.com/api/1.0/users")
            .then((res) => {
                if(!res.ok) {
                    throw new Error("Failed to fetch posts");
                }
                return res.json()
            })
            .then((data) => {
                props.setUsers(data.items)
            })
            .catch((err) => {
                console.error("Failed to fetch posts", err);
            })
    }

    return <div className={classes.users}>
        {
            props.users.map( u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} alt=""/>
                    </div>
                    <div>
                        {u.followed ?
                            <button onClick={ () => { props.unfollow(u.id) } }>Unfollow</button> :
                            <button onClick={ () => { props.follow(u.id) } }>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div><div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>

                    </span>
                </span>

            </div>)
        }
        </div>

};

export default Users;