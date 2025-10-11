import React from 'react';
import {connect} from "react-redux";
import {
    follow, requestUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import withAuthRedirect from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {
    getUsers,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress,
} from "../../redux/users-selectors";



class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize)
    }

    onPageChange = (pageNumber) => {
        const {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize)

    }

    render() {
        const {isFetching, totalUsersCount, pageSize, currentPage, users,
            unfollow, follow, toggleFollowingProgress, followingInProgress} = this.props;
        return <>
            {isFetching ? <Preloader/> : null}
            <Users totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChange={this.onPageChange}
                   users={users}
                   unfollow={unfollow}
                   follow={follow}
                   toggleFollowingProgress={toggleFollowingProgress}
                   followingInProgress={followingInProgress}
            />
        </>
    }
}

let mapStateToProps = state => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingProgress,
        requestUsers
    }),
    withAuthRedirect
)(UsersContainer)