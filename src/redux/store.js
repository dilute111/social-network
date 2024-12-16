import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import sidebarReducer from "./sidebar-reducer";

export let avatarsData = {
    Dimych: "https://i.pinimg.com/736x/c7/2b/9e/c72b9eee2ca6974a1c8dd861aef6e9df.jpg",
    Andrey: "https://i1.sndcdn.com/artworks-2nRzQYhwpFs6RqGq-HrJK1Q-t500x500.jpg",
    Sveta: "https://avatars.mds.yandex.net/i?id=195618a07e0fd6057af3a86cc32d5ca3_sr-4580368-images-thumbs&n=13",
    Sasha: "https://i.pinimg.com/736x/bc/50/1a/bc501a12dd54dbbd93151d01af869fab.jpg",
    Viktor: "https://avatars.mds.yandex.net/i?id=31930f38df93cea551295320d27ec8f9_l-8370529-images-thumbs&n=13",
    Valera: "https://i1.sndcdn.com/artworks-000163091497-8x2xuu-t500x500.jpg",
}

let store = {
    _state: {
        profilePage: {
            p: [
                {id: 1, message: "Hello, this is my first post", likesCount: 12},
                {id: 2, message: "Hi, how are you?", likesCount: 0},
                {id: 3, message: "Blabla", likesCount: 26},
                {id: 4, message: "Yo", likesCount: 6},
                {id: 5, message: "Hello", likesCount: 1},

            ],
            newPostText: "it-kamasutra.com"
        },
        messagesPage: {
            d: [
                {id: 1, name: "Dimych", ava: avatarsData.Dimych},
                {id: 2, name: "Andrey", ava: avatarsData.Andrey},
                {id: 3, name: "Sveta", ava: avatarsData.Sveta},
                {id: 4, name: "Sasha", ava: avatarsData.Sasha},
                {id: 5, name: "Viktor", ava: avatarsData.Viktor},
                {id: 6, name: "Valera", ava: avatarsData.Valera}
            ],
            m: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How are you?"},
                {id: 3, message: "Yo"},
                {id: 4, message: "Yo"},
                {id: 5, message: "Yo"}
            ],
            newMessageBody: ""
        },
        sidebar: {}
    },
    _callSubscriber() { // функция, которой присваивается ререндер, для дальнейшего взаимодействия
        console.log("state changed")
    },

    getState() {
        return this._state
    },
    subscribe(observer) { // получить и присвоить пустышке callSubscriber полученную функцию ререндер
        this._callSubscriber = observer
    },

    dispatch(action) { // { type: 'ADD-POST' }

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }
}


export default store
window.store = store