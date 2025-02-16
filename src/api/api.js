const baseUrl = "https://social-network.samuraijs.com/api/1.0/"

export const profileAPI = {
    getProfile(userId) {
        return fetch(`${baseUrl}profile/${userId}`, {
            credentials: "include",
            headers: {
                'API-KEY': `834ca93b-5707-452e-9e3e-5931a37d50a6`,
            }
        })
            .then(response => {
                return response.json()
            })
    },
    getStatus(userId) {
        return fetch(`${baseUrl}profile/status/${userId}`, {
            credentials: "include",
            headers: {
                'API-KEY': `834ca93b-5707-452e-9e3e-5931a37d50a6`,
            }
        })
            .then(response => {
                return response.json()
            })
    },
    updateStatus(status) {
        return fetch(`${baseUrl}profile/status`, {
            method: "PUT",
            credentials: "include",
            headers: {
                'API-KEY': `834ca93b-5707-452e-9e3e-5931a37d50a6`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
            .then(response => {
                return response.json()
            })
    }
}

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
        console.warn("Obsolete method, use profileAPI object.")
        return profileAPI.getProfile(userId)
    }
}

export const authAPI = {
    me() {
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
    login(email, password, rememberMe = false) {
        return fetch(`${baseUrl}auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, rememberMe})
        })
            .then((response) => {
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
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json()
            })
    }
}