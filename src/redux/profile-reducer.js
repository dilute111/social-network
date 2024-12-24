const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"

let initialState = {
    p: [
        {id: 1, message: "Hello, this is my first post", likesCount: 12},
        {id: 2, message: "Hi, how are you?", likesCount: 0},
        {id: 3, message: "Blabla", likesCount: 26},
        {id: 4, message: "Yo", likesCount: 6},
        {id: 5, message: "Hello", likesCount: 1},

    ],
    newPostText: "angulyai"
}

const profileReducer = (state = initialState, action) => {
    let newPost = {
        id: 6,
        message: state.newPostText,
        likesCount: 0
    }

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                p: [...state.p, newPost],
                newPostText: ""
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.text
            }
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT, text: text
})

export default profileReducer