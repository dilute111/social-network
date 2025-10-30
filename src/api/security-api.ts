import {baseUrl} from "./api";
import {ICaptchaUrl} from "../types/types";

export const securityAPI = {
    getCaptchaUrl(): Promise<ICaptchaUrl> {
        return fetch(`${baseUrl}security/get-captcha-url`, {
            method: "GET",
            credentials: "include",
            headers: {
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error, status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Error fetching captcha URL:", error);
                throw error; // Пробрасываем ошибку дальше, чтобы её можно было обработать в компоненте
            });
    }
}