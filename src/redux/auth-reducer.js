import {authAPI} from "../api/api";

const SET_USER_DATA = "dilute-network/auth/SET_USER_DATA"

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

export const setAuthUserData = (userId, email, login, rememberMe, isAuthorized) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, rememberMe, isAuthorized}
})

export const getAuthUserData = () => async (dispatch) => {
    try {
        const data = await authAPI.me()

        if (data.resultCode === 0) {
            let {id, email, login, rememberMe} = data.data
            dispatch(setAuthUserData(id, email, login, rememberMe, true))
        } else {
            console.error("Failed to fetch user data", data.messages);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const login = (email, password, rememberMe, setError, setValue) => async (dispatch) => {
    try {
        const data = await authAPI.login(email, password, rememberMe)

        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            setError("server", {
                type: "server",
                message: data.messages[0] || "Ошибка входа. Проверьте данные."
            })
            setValue("email", "");
            setValue("password", "");
        }
    } catch (error) {
        console.error('Error login:', error);
        setError("server", {
            type: "server",
            message: "Ошибка сервера, попробуйте позже"
        })
        setValue("email", "");
        setValue("password", "");
    }
}

export const logout = () => async (dispatch) => {
    try {
        const data = await authAPI.logout()

        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}


export default authReducer