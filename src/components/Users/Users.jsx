import React from 'react';
import classes from "./Users.module.css";
import axios from "axios";
import userPhoto from "../../assets/images/user.png"

class Users extends React.Component {
  
    componentDidMount() {
        fetch("https://social-network.samuraijs.com/api/1.0/users")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch posts");
                }
                return res.json()
            })
            .then((data) => {
                this.props.setUsers(data.items)
            })
            .catch((err) => {
                console.error("Failed to fetch posts", err);
            })
    }

    render() {
        return <div className={classes.users}>
            {
                this.props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} alt=""/>
                    </div>
                    <div>
                        {u.followed ?
                            <button onClick={() => {
                                this.props.unfollow(u.id)
                            }}>Unfollow</button> :
                            <button onClick={() => {
                                this.props.follow(u.id)
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
    }
}


export default Users;