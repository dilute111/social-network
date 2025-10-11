import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const DELETE_POST = "DELETE_POST"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"
const SAVE_PROFILE_INFO_SUCCESS = "SAVE_PROFILE_INFO_SUCCESS"

let initialState = {
    posts: [
        {id: 1, message: "Hello, this is my first post", likesCount: 12},
        {id: 2, message: "Hi, how are you?", likesCount: 0},
        {id: 3, message: "Blabla", likesCount: 26},
        {id: 4, message: "Yo", likesCount: 6},
        {id: 5, message: "Hello", likesCount: 1},

    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.posts.length + 1,
                message: action.payload,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],

            };
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        case SAVE_PROFILE_INFO_SUCCESS: {
            return {...state, profile: {...state.profile, ...action.profileInfo}}
        }
        default:
            return state
    }
}

export const addPostActionCreator = (text) => ({type: ADD_POST, payload: text})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})
export const saveProfileSuccess = (profileInfo) => ({type: SAVE_PROFILE_INFO_SUCCESS, profileInfo})

export const getUserProfile = (userId) => async (dispatch) => {
    const data = await usersAPI.getProfile(userId)
    try {
        dispatch(setUserProfile(data))
    } catch (err) {
        console.error("Failed to fetch posts", err);
    }
}
export const getStatus = (userId) => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    try {
        dispatch(setStatus(data))
    } catch (err) {
        console.error("Failed to fetch posts", err);
    }
}
export const updateStatus = (status) => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    try {
        if (data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (err) {
        console.error("Failed to update status", err.message);
    }
}
export const savePhoto = (file) => async (dispatch) => {
    try {
        const data = await profileAPI.savePhoto(file)
        if (data.resultCode === 0) {
            dispatch(savePhotoSuccess(data.data.photos))
        }
    } catch (err) {
        console.error("Failed to fetch photo", err);
    }
}
export const saveProfile = (profileInfo) => async (dispatch) => {
    try {
        const data = await profileAPI.saveProfile(profileInfo)
        if (data.resultCode === 0) {
            dispatch(saveProfileSuccess(profileInfo))
        } else {
            const errorMessage = data.messages.length > 0 ? data.messages.join(", ") : "Failed to save profile";
            throw new Error(errorMessage)
        }
    } catch (err) {
        console.error("Failed to fetch profile", err);
        throw err
    }
}

export const updateNewPostActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT, text: text
})

export default profileReducer