import {baseUrl} from "./api";
import {IGetItems, ILogin} from "../types/types";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10): Promise<IGetItems> {
        return fetch(`${baseUrl}users?page=${currentPage}&count=${pageSize}`, {
            credentials: "include",
            headers: {
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`
            }
        }).then(response => response.json())
    },
    followUnfollowRequest(userId: number, method: "POST" | "DELETE"): Promise<ILogin> {
        return fetch(`${baseUrl}follow/${userId}`, {
            method: method,
            credentials: "include",
            headers: {
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`,
            }
        }).then(response => response.json())
    },

}