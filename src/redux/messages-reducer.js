import {avatarsData} from "./store";

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

}

const messagesReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEND_MESSAGE:
            let body = action.body
            return {
                ...state,
                m: [...state.m, { id: state.m.length + 1, message: body }]
            }
        default:
            return state
    }
}


export const sendMessageCreator = (body) => ({type: SEND_MESSAGE, body})

export default messagesReducer