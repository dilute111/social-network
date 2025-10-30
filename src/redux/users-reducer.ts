import {updateUserInfo} from "../utils/object-helpers";
import {
    ActionTypes, BaseThunkType,
    IActions,
    IFollowSuccess,
    ISetCurrentPage,
    ISetTotalUsersCount,
    ISetUsers,
    IToggleFollowingProgress,
    IToggleIsFetching,
    IUnfollowSuccess,
    IUser,
    IUsersReducerInitialState,
    ResultCodesEnum
} from "../types/types";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";


let initialState: IUsersReducerInitialState = {
    users: [] as IUser[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as number[]
}

export const usersReducer = (state = initialState, action: IActions): IUsersReducerInitialState => {
    switch (action.type) {
        case ActionTypes.FOLLOW:
            return {
                ...state,
                users: updateUserInfo(state.users, action.userId, "id", {followed: true})

            }
        case ActionTypes.UNFOLLOW:
            return {
                ...state,
                users: updateUserInfo(state.users, action.userId, "id", {followed: false})
            }
        case ActionTypes.SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case ActionTypes.SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case ActionTypes.SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case ActionTypes.TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case ActionTypes.TOGGLE_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}

export const actions = {
    followSuccess: (userId: number): IFollowSuccess => ({type: ActionTypes.FOLLOW, userId}),
    unfollowSuccess: (userId: number): IUnfollowSuccess => ({type: ActionTypes.UNFOLLOW, userId}),
    setUsers: (users: IUser[]): ISetUsers => ({type: ActionTypes.SET_USERS, users}),
    setCurrentPage: (currentPage: number): ISetCurrentPage => ({
        type: ActionTypes.SET_CURRENT_PAGE,
        currentPage
    }),
    setTotalUsersCount: (totalUsersCount: number): ISetTotalUsersCount => ({
        type: ActionTypes.SET_TOTAL_USERS_COUNT,
        count: totalUsersCount
    }),
    toggleIsFetching: (isFetching: boolean): IToggleIsFetching => ({
        type: ActionTypes.TOGGLE_IS_FETCHING,
        isFetching
    }),
    toggleFollowingProgress: (isFetching: boolean, userId: number): IToggleFollowingProgress => ({
        type: ActionTypes.TOGGLE_FOLLOWING_IN_PROGRESS,
        isFetching,
        userId
    }),
}

type DispatchType = Dispatch<IActions>
type ThunkType = BaseThunkType<IActions>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch: DispatchType, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));

        try {
            const data = await usersAPI.getUsers(page, pageSize)

            dispatch(actions.toggleIsFetching(false));
            dispatch(actions.setCurrentPage(page));
            dispatch(actions.setUsers(data.items));
            dispatch(actions.setTotalUsersCount(data.totalCount));
        } catch (error) {
            dispatch(actions.toggleIsFetching(false));
            console.error("Error fetching users:", error)
        }
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number,
                                   actionCreator: (userId: number) => IFollowSuccess | IUnfollowSuccess,
                                   requestMethod: "POST" | "DELETE"): Promise<void> => {
    console.log('_followUnfollowFlow started for user:', userId, 'method:', requestMethod);

    dispatch(actions.toggleFollowingProgress(true, userId))
    try {
        console.log('Making API request...');
        const data = await usersAPI.followUnfollowRequest(userId, requestMethod)
        console.log('API response:', data);

        if (data.resultCode === ResultCodesEnum.Success) {
            console.log('Dispatching action for user:', userId);
            dispatch(actionCreator(userId))
        } else {
            console.error('Error following user:', data.messages);
        }
        console.log('_followUnfollowFlow completed for user:', userId);

        dispatch(actions.toggleFollowingProgress(false, userId))
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        try {
            await _followUnfollowFlow(dispatch, userId, actions.followSuccess, "POST" as const)
        } catch(e) {

        }

    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        try {
            await _followUnfollowFlow(dispatch, userId, actions.unfollowSuccess, "DELETE" as const)
        } catch(e) {
            console.log("Failed unfollowing" + e)   
        }
    }
}

export default usersReducer