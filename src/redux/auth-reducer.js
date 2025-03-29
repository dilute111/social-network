import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = "dilute-network/auth/SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = "dilute-network/auth/GET_CAPTCHA_URL_SUCCESS"

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuthorized: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
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

export const setAuthUserData = (userId, email, login, rememberMe, isAuthorized, captchaUrl) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, rememberMe, isAuthorized, captchaUrl}
})

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})

export const getAuthUserData = () => async (dispatch) => {
    try {
        const data = await authAPI.me()

        if (data.resultCode === 0) {
            let {id, email, login, rememberMe, captchaUrl} = data.data
            dispatch(setAuthUserData(id, email, login, rememberMe, true, captchaUrl))
        } else {
            console.error("Failed to fetch user data", data.messages);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const login = (email, password, rememberMe, captcha, setError, setValue) => async (dispatch) => {
    try {
        const data = await authAPI.login(email, password, rememberMe, captcha)

        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else if (data.resultCode === 10) {
            dispatch(getCaptchaUrl())
            setError("server", {
                type: "server",
                message: "Требуется капча. Пожалуйста, введите капчу.",
            });
            setValue("captcha", "");
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

export const getCaptchaUrl = () => async (dispatch) => {
    try {
        const data = await securityAPI.getCaptchaUrl()
        const captchaUrl = data.url
        dispatch(getCaptchaUrlSuccess(captchaUrl))
    } catch (error) {
        console.log(error)
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