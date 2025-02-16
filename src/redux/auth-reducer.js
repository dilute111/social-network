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
                ...action.payload,
            }
        default :
            return {
                ...state
            }
    }
}

export const setAuthUserData = (email, login, rememberMe, isAuthorized) => ({
    type: SET_USER_DATA,
    payload: {email, login, rememberMe, isAuthorized }
})

export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
        .then((data) => {
            if (data.resultCode === 0) {
                let {email, login, rememberMe} = data.data
                dispatch(setAuthUserData(email, login, rememberMe, true))
            } else {
                console.error("Failed to fetch posts", data.messages);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        })
}

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then((data) => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        })
}
export const logout = () => (dispatch) => {
    authAPI.logout()
        .then((data) => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
        .catch((error) => {
            console.error('Error during logout:', error);
        })
}

export default authReducer