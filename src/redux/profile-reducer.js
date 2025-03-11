import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const DELETE_POST = "DELETE_POST"

let initialState = {
    p: [
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
                id: state.p.length + 1,
                message: action.payload,
                likesCount: 0,
            };
            return {
                ...state,
                p: [...state.p, newPost],

            };
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case DELETE_POST: {
            return {...state, p: state.p.filter(p => p.id !== action.postId)}
        }
        default:
            return state
    }
}

export const addPostActionCreator = (text) => ({type: ADD_POST, payload: text})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})

export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId)
        .then((data) => {
            dispatch(setUserProfile(data))
        })
        .catch((err) => {
            console.error("Failed to fetch posts", err);
        })
}
export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then((data) => {
            dispatch(setStatus(data))
        })
        .catch((err) => {
            console.error("Failed to fetch posts", err);
        })
}
export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then((data) => {
            if(data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
        .catch((err) => {
            console.error("Failed to fetch posts", err);
        })
}

export const updateNewPostActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT, text: text
})

export default profileReducer