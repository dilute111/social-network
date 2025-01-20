import {authAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA"


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuthorized: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuthorized: true
            }
        default :
            return {
                ...state
            }
    }
}

export const setAuthUserData = (id, email, login) => ({
    type: SET_USER_DATA,
    data: {id, email, login}
})

export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
        .then((data) => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login))
            } else {
                console.error("Failed to fetch posts", data.messages);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        })
}

export default authReducer