import React, {useState} from 'react';
import classes from "./Paginator.module.css";


const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChange}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const [pageOffset, setPageOffset] = useState(0);
    const pageBlockSize = 20;

    const handleNext = () => {
        if (pageOffset + pageBlockSize < pagesCount) {
            setPageOffset(pageOffset + pageBlockSize);
        }
    };
    const handlePrev = () => {
        if (pageOffset - pageBlockSize >= 0) {
            setPageOffset(pageOffset - pageBlockSize);
        }
    };

    return (
        <div className={classes.users}>
            <button onClick={handlePrev} disabled={pageOffset === 0}>Prev</button>
            {pages.slice(pageOffset, pageOffset + pageBlockSize).map(p => {
                return <button className={currentPage === p ? classes.selectedPage : ""}
                               onClick={(e) => {
                                   onPageChange(p)
                               }}>{p}</button>
            })}
            <button onClick={handleNext} disabled={pageOffset + pageBlockSize >= pagesCount}>Next</button>
        </div>
    );
};

export default Paginator;