import React from 'react';
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={classes.users}>
            <div>
                {pages.slice(0, 30).map(p => {
                    return <button className={props.currentPage === p ? classes.selectedPage : ""}
                                   onClick={(e) => {
                                       props.onPageChange(p)
                                   }}>{p}</button>
                })}

            </div>
            {
                props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={`/profile/${u.id}`}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} alt=""/>
                            </NavLink>
                    </div>
                    <div>
                        {u.followed ?
                            <button onClick={() => {

                                fetch(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                    method: "DELETE",
                                    credentials: "include",
                                    headers: {

                                        'API-KEY': `834ca93b-5707-452e-9e3e-5931a37d50a6`,
                                    },
                                })
                                    .then((res) => {

                                        if (!res.ok) {
                                            throw new Error(`HTTP error! status: ${res.status}`);
                                        }
                                        return res.json();
                                    })
                                    .then((data) => {

                                        if(data.resultCode == 0 ){

                                            props.unfollow(u.id)
                                        } else {
                                            console.error('Error following user:', data.messages);
                                        }
                                    })
                                    .catch((error) => {
                                        console.error('Fetch error:', error);
                                    });



                            }}>Unfollow</button> :
                            <button onClick={() => {

                                fetch(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                    method: "POST",
                                    credentials: "include",
                                    headers: {

                                        'API-KEY': `834ca93b-5707-452e-9e3e-5931a37d50a6`,
                                    },
                                })
                                    .then((res) => {

                                        if (!res.ok) {
                                            throw new Error(`HTTP error! status: ${res.status}`);
                                        }
                                        return res.json();
                                    })
                                    .then((data) => {

                                        if(data.resultCode == 0 ){

                                            props.follow(u.id)
                                        } else {
                                            console.error('Error following user:', data.messages);
                                        }
                                    })
                                    .catch((error) => {
                                        console.error('Fetch error:', error);
                                    });


                            }}>Follow</button>}
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
    );
};

export default Users;