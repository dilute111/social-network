import {
    ActionTypes,
    IDialogs,
    IMessages,
    IMessagesInitialState,
    MessagesActionsType
} from "../types/types";

export const messagesInitialState: IMessagesInitialState = {
    d: [
        {id: 1, name: "Dasha", ava: "Dasha"},
        {id: 2, name: "Andrey", ava: "Andrey"},
        {id: 3, name: "Sveta", ava: "Sveta"},
        {id: 4, name: "Sasha", ava: "Sasha"},
        {id: 5, name: "Dimych", ava: "Dimych"},
        {id: 6, name: "Kristina", ava: "Kristina"}
    ] as IDialogs[],
    m: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "Yo"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"}
    ] as IMessages[],
}

export const messagesActions = {
    sendMessage: (body: string) => ({type: ActionTypes.SEND_MESSAGE, body} as const)
}

const messagesReducer = (state = messagesInitialState, action: MessagesActionsType): IMessagesInitialState => {

    switch (action.type) {

        case ActionTypes.SEND_MESSAGE:
            let body = action.body
            return {
                ...state,
                m: [...state.m, { id: state.m.length + 1, message: body }]
            }
        default:
            return state
    }
}




export default messagesReducer