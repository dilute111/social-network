import React, {FC} from 'react';
import classes from './Friends.module.css';
import {IDialogs} from "../../../types/types";

interface FriendsProps {
    friends: IDialogs[];
    totalFriendsCount: number;
}

const Friends: FC<FriendsProps> = ({friends, totalFriendsCount}) => {

    if (!friends || !Array.isArray(friends)) {
        return <div>Loading friends...</div>;
    }

    return (
        <>
            <div>Friends</div>
            <div className={classes.friends}>

                {friends.map(f =>
                    <div key={f.id} className={classes.friendItem}>
                        <img src={`https://i.pravatar.cc/150?u=${f.id}`} alt="Avatar"/> {f.name}
                    </div>)}
                <span className={classes.rest}>and {(totalFriendsCount - friends.length)} more</span>

            </div>
        </>
    );
};

export default Friends;