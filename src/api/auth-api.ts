import {IDataMe, ILogin, IResponse, ResultCodeForCaptcha, ResultCodesEnum} from "../types/types";
import {baseUrl} from "./api";

export const authAPI = {
    me(): Promise<IResponse<IDataMe>> {
        return fetch(`${baseUrl}auth/me`, {
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json()
            })
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null)
        : Promise<IResponse<ILogin, ResultCodesEnum | ResultCodeForCaptcha>> {
        return fetch(`${baseUrl}auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, rememberMe, captcha})
        })
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json()
            })
    },
    logout() {
        return fetch(`${baseUrl}auth/login`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json()
            })
    }
}