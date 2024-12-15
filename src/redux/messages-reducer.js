import {avatarsData} from "./store";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"

let initialState = {
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
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            return state
        case SEND_MESSAGE:
            let body = state.newMessageBody
            state.newMessageBody = ""
            state.m.push({id: 6, message: body})
            return state
        default:
            return state
    }
}

export const updateNewMessageBodyCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY, body: body
})
export const sendMessageCreator = () => ({type: SEND_MESSAGE})

export default messagesReducer