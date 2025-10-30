import {
    ActionTypes,
    IAddPostActionCreator,
    IDeletePost,
    IPhotos,
    IPosts,
    IProfile,
    IProfileReducerInitialState,
    ISavePhotoSuccess,
    ISaveProfileSuccess,
    ISetStatus,
    ISetUserProfile,
    ResultCodesEnum,
    IUpdateNewPostTextAction,
    ProfileActions,
} from "../types/types";
import {profileAPI} from "../api/profile-api";


let initialState: IProfileReducerInitialState = {
    posts: [
        {id: 1, message: "Hello, this is my first post", likesCount: 12},
        {id: 2, message: "Hi, how are you?", likesCount: 0},
        {id: 3, message: "Blabla", likesCount: 26},
        {id: 4, message: "Yo", likesCount: 6},
        {id: 5, message: "Hello", likesCount: 1},

    ] as IPosts[],
    profile: null as IProfile | null,
    status: "",
    newPostText: ""
}

const profileReducer = (state = initialState, action: ProfileActions): IProfileReducerInitialState => {

    switch (action.type) {
        case ActionTypes.UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.text
            };
        case ActionTypes.ADD_POST:
            let newPost = {
                id: state.posts.length + 1,
                message: action.payload,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            };
        case ActionTypes.SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case ActionTypes.SET_STATUS: {
            return {...state, status: action.status}
        }
        case ActionTypes.DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case ActionTypes.SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        case ActionTypes.SAVE_PROFILE_INFO_SUCCESS: {
            return {...state, profile: {...state.profile, ...action.profileInfo}}
        }
        default:
            return state
    }
}

export const addPostActionCreator = (text: string): IAddPostActionCreator => ({type: ActionTypes.ADD_POST, payload: text})
export const setUserProfile = (profile: IProfile): ISetUserProfile => ({type: ActionTypes.SET_USER_PROFILE, profile})
export const setStatus = (status: string): ISetStatus => ({type: ActionTypes.SET_STATUS, status})
export const deletePost = (postId: number): IDeletePost => ({type: ActionTypes.DELETE_POST, postId})
export const savePhotoSuccess = (photos: IPhotos): ISavePhotoSuccess => ({type: ActionTypes.SAVE_PHOTO_SUCCESS, photos})
export const saveProfileSuccess = (profileInfo: IProfile): ISaveProfileSuccess => ({type: ActionTypes.SAVE_PROFILE_INFO_SUCCESS, profileInfo})

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    try {
        const data = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(data))
    } catch (err) {
        console.error("Failed to fetch posts", err);
    }
}
export const getStatus = (userId: number) => async (dispatch: any) => {
    try {
        const data = await profileAPI.getStatus(userId)
        dispatch(setStatus(data))
    } catch (err) {
        console.error("Failed to fetch posts", err);
    }
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(setStatus(status))
        }
    } catch (err) {
        console.error("Failed to update status", err.message);
    }
}
export const savePhoto = (file: Blob) => async (dispatch: any) => {
    try {
        const data = await profileAPI.savePhoto(file)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(savePhotoSuccess(data.data.photos))
        }
    } catch (err) {
        console.error("Failed to fetch photo", err);
    }
}
export const saveProfile = (profileInfo: IProfile) => async (dispatch: any) => {
    try {
        const data = await profileAPI.saveProfile(profileInfo)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(saveProfileSuccess(profileInfo))
            return { success: true }
        } else {
            const errorMessage = data.messages.length > 0 ? data.messages.join(", ") : "Failed to save profile";
            return { error: errorMessage }
        }
    } catch (err) {
        console.error("Failed to fetch profile", err);
        return { error: err.message }
    }
}

export const updateNewPostActionCreator = (text: string): IUpdateNewPostTextAction  => ({
    type: ActionTypes.UPDATE_NEW_POST_TEXT,
    text: text
})

export default profileReducer