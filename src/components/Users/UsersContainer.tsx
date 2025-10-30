import React from 'react';
import {connect} from "react-redux";
import {follow, requestUsers, unfollow} from "../../redux/users-reducer";
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
import {
    IUsersContainerMapDispatchToProps,
    IUsersContainerMapStateToProps, IUsersContainerOwnProps,
    IUsersContainerProps
} from "../../types/types";
import {RootState} from "../../redux/redux-store";


class UsersContainer extends React.Component<IUsersContainerProps> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize)
    }

    onPageChange = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize)

    }

    render() {
        const {
            isFetching, totalUsersCount, pageSize, currentPage, users,
            unfollow, follow, followingInProgress
        } = this.props;
        return <>
            <h2>{this.props.pageTitle}</h2>
            {isFetching ? <Preloader/> : null}
            <Users totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChange={this.onPageChange}
                   users={users}
                   unfollow={unfollow}
                   follow={follow}
                   followingInProgress={followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: RootState): IUsersContainerMapStateToProps => {
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
    connect<IUsersContainerMapStateToProps, IUsersContainerMapDispatchToProps, IUsersContainerOwnProps, RootState>(
        mapStateToProps, {
            follow,
            unfollow,
            requestUsers
        }),
    withAuthRedirect
)(UsersContainer)