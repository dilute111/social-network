const baseUrl = "https://social-network.samuraijs.com/api/1.0/"


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return fetch(`${baseUrl}users?page=${currentPage}&count=${pageSize}`, {
            credentials: "include",
        }).then(response => {
            return response.json()
        })
    },
    followUnfollowRequest(userId, method) {
        return fetch(`${baseUrl}follow/${userId}`, {
            method: method,
            credentials: "include",
            headers: {
                'API-KEY': `834ca93b-5707-452e-9e3e-5931a37d50a6`,
            }
        })
            .then(response => {
                return response.json()
            })
    },
    getProfile(userId) {
        return fetch(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`, {
            credentials: "include",
            headers: {
                'API-KEY': `834ca93b-5707-452e-9e3e-5931a37d50a6`,
            }
        })
            .then(response => {
                return response.json()
            })
    }
}

export const authAPI = {
    me() {
        return fetch(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json()
            })
    },
    
}