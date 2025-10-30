import React, {FC} from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {IUsersProps} from "../../types/types";


const Users: FC<IUsersProps> = ({totalUsersCount, pageSize, currentPage, onPageChange, users, unfollow, followingInProgress, follow}) => {
    return (
        <div>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize}
                       currentPage={currentPage} onPageChange={onPageChange} />
            {
                users.map(u => <User user={u}
                                     followingInProgress={followingInProgress}
                                     key={u.id}
                                     unfollow={unfollow}
                                     follow={follow}
                />)
            }
        </div>
    );
};

export default Users;