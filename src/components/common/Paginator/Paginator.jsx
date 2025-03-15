import React from 'react';
import classes from "./Paginator.module.css";


const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChange}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
            <div className={classes.users}>
                {pages.slice(0, 37).map(p => {
                    return <button className={currentPage === p ? classes.selectedPage : ""}
                                   onClick={(e) => {
                                       onPageChange(p)
                                   }}>{p}</button>
                })}
                </div>
    );
};

export default Paginator;