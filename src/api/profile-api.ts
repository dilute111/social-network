import {IPhotos, IProfile, IResponse, ISavePhoto, ResultCodesEnum} from "../types/types";
import {baseUrl} from "./api";

export const profileAPI = {
    getProfile(userId: number): Promise<IProfile> {
        return fetch(`${baseUrl}profile/${userId}`, {
            credentials: "include",
            headers: {
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`,
            }
        }).then(response => response.json())
    },

    getStatus(userId: number): Promise<string> {
        return fetch(`${baseUrl}profile/status/${userId}`, {
            credentials: "include",
            headers: {
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`,
            }
        }).then(response => response.json())
    },

    updateStatus(status: string): Promise<IResponse> {
        return fetch(`${baseUrl}profile/status`, {
            method: "PUT",
            credentials: "include",
            headers: {
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status})
        }).then(response => response.json())
    },

    savePhoto(photoFile: Blob): Promise<IResponse<ISavePhoto>> {
        const formData = new FormData();
        formData.append("image", photoFile)

        return fetch(`${baseUrl}profile/photo`, {
            method: "PUT",
            credentials: "include",
            headers: {
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`,
            },
            body: formData
        }).then(response => response.json())
    },

    saveProfile(profileInfo: IProfile): Promise<IResponse> {
        return fetch(`${baseUrl}profile`, {
            method: "PUT",
            credentials: "include",
            headers: {
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileInfo)
        }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json()
            })
            .catch(err => {
                console.error("Error in saveProfile:", err);
                throw err; // Пробрасываем ошибку дальше
            })
    },
}