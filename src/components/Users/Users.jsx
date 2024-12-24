import React from 'react';
import classes from "./Users.module.css";

const Users = (props) => {
    let a = "https://avatars.yandex.net/get-music-content/9838169/7e19a440.a.26720548-1/400x400"
    if (props.users.length === 0) {
        props.setUsers([
                {
                    id: 1, fullName: "Dmitry", location: {city: "Minsk", country: "Belarus"}, status: "i am a boss",
                    followed: false, photoUrl: a
                },
                {
                    id: 2, fullName: "Sasha", location: {city: "Vologda", country: "Russia"}, status: "i am a boss too",
                    followed: true, photoUrl: a
                },
                {
                    id: 3,
                    fullName: "Andrew",
                    location: {city: "Yekaterinburg", country: "Russia"},
                    status: "i am a boss too",
                    followed: false,
                    photoUrl: a
                },
                {
                    id: 4, fullName: "Sveta", location: {city: "Rezh", country: "Russia"}, status: "i'm pretty",
                    followed: false, photoUrl: a
                },
                {
                    id: 5,
                    fullName: "Valera",
                    location: {city: "Podzalupinsk", country: "Russia"},
                    status: "i like football!!",
                    followed: true,
                    photoUrl: a
                },
            ]
        )
    }

    return <div className={classes.users}>
        {
            props.users.map( u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} alt=""/>
                    </div>
                    <div>
                        {u.followed ?
                            <button onClick={ () => { props.unfollow(u.id) } }>Unfollow</button> :
                            <button onClick={ () => { props.follow(u.id) } }>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div><div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>

                    </span>
                </span>

            </div>)
        }
        </div>

};

export default Users;