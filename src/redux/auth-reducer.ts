import {
    ActionTypes, AuthActionsType, AuthThunkType,
    IAuthInitialState,
    IGetCaptchaUrlSuccess,
    ISetAuthUserDataAction, ResultCodeForCaptcha, ResultCodesEnum
} from "../types/types";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

let initialState: IAuthInitialState = {
    userId: null,
    email: null,
    login: null,
    isAuthorized: false,
    captchaUrl: null
}



const authReducer = (state = initialState, action: AuthActionsType): IAuthInitialState => {
    switch (action.type) {
        case ActionTypes.SET_USER_DATA:
        case ActionTypes.GET_CAPTCHA_URL_SUCCESS:
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

export const authActions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, rememberMe: boolean,
                                    isAuthorized?: boolean, captchaUrl?: string): ISetAuthUserDataAction => ({
        type: ActionTypes.SET_USER_DATA,
        payload: {userId, email, login, rememberMe, isAuthorized, captchaUrl}
    } as const),

    getCaptchaUrlSuccess: (captchaUrl: string): IGetCaptchaUrlSuccess => ({
        type: ActionTypes.GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    } as const),


}

export const getAuthUserData = (): AuthThunkType => async (dispatch, getState) => {
    try {
        const data = await authAPI.me()

        if (data.resultCode === ResultCodesEnum.Success) {
            let {id, email, login, rememberMe, captchaUrl} = data.data
            dispatch(authActions.setAuthUserData(id, email, login, rememberMe, true, captchaUrl))
        } else {
            console.error("Failed to fetch user data", data.messages);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null,
                      setError: any, setValue: any): AuthThunkType => async (dispatch) => {
    try {
        const data = await authAPI.login(email, password, rememberMe, captcha)

        if (data.resultCode === ResultCodesEnum.Success) {
            await dispatch(getAuthUserData())
        } else if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired as number) {
            await dispatch(getCaptchaUrl())
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

export const getCaptchaUrl = (): AuthThunkType => async (dispatch) => {
    try {
        const data = await securityAPI.getCaptchaUrl()
        const captchaUrl = data.url
        dispatch(authActions.getCaptchaUrlSuccess(captchaUrl))
    } catch (error) {
        console.log(error)
    }
}

export const logout = (): AuthThunkType => async (dispatch) => {
    try {
        const data = await authAPI.logout()

        if (data.resultCode === 0) {
            dispatch(authActions.setAuthUserData(null, null, null, false))
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}


export default authReducer

