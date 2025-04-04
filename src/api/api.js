const baseUrl = "https://social-network.samuraijs.com/api/1.0/"

export const profileAPI = {
    getProfile(userId) {
        return fetch(`${baseUrl}profile/${userId}`, {
            credentials: "include",
            headers: {
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`,
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
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`,
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
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
            .then(response => {
                return response.json()
            })
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile)

        return fetch(`${baseUrl}profile/photo`, {
            method: "PUT",
            credentials: "include",
            headers: {
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`,
            },
            body: formData
        })
            .then(response => {
                return response.json()
            })
    },
    saveProfile(profileInfo) {
        return fetch(`${baseUrl}profile`, {
            method: "PUT",
            credentials: "include",
            headers: {
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileInfo)
        })
            .then(response => {
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

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return fetch(`${baseUrl}users?page=${currentPage}&count=${pageSize}`, {
            credentials: "include",
            headers: {
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`
            }
        }).then(response => {
            return response.json()
        })
    },
    followUnfollowRequest(userId, method) {
        return fetch(`${baseUrl}follow/${userId}`, {
            method: method,
            credentials: "include",
            headers: {
                'API-KEY': `3f4730fc-bf77-4164-9640-990777c5cdbf`,
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
    login(email, password, rememberMe = false, captcha = null) {
        return fetch(`${baseUrl}auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, rememberMe, captcha})
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
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json()
            })
    }
}

export const securityAPI = {
    getCaptchaUrl (){
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