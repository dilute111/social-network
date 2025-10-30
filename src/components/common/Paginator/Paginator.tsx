import React, {FC, useMemo, useState} from 'react';
import classes from "./Paginator.module.css";
import {IPaginatorProps} from "../../../types/types";


const Paginator: FC<IPaginatorProps> = ({totalUsersCount, pageSize, currentPage, onPageChange}) => {

    const [pageOffset, setPageOffset] = useState(0);
    const pageBlockSize = 20;

    const {pages, pagesCount} = useMemo(() => {
        let pagesCount = Math.ceil(totalUsersCount / pageSize)
        let pages: number[] = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        return { pages, pagesCount };
    }, [totalUsersCount, pageSize])

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
        <div className={`${classes.users}`}>
            <button onClick={handlePrev} disabled={pageOffset === 0}>Prev</button>
            {pages.slice(pageOffset, pageOffset + pageBlockSize).map(p => {
                return <button key={p} className={currentPage === p ? classes.selectedPage : ""}
                               onClick={(e) => {
                                   onPageChange(p)
                               }}>{p}</button>
            })}
            <button onClick={handleNext} disabled={pageOffset + pageBlockSize >= pagesCount}>Next</button>
        </div>
    );
};

export default Paginator;