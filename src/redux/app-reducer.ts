import {getAuthUserData} from "./auth-reducer";
import {ActionTypes, IAppInitialState, IInitializedSuccessAction} from "../types/types";


let initialState : IAppInitialState = {
    initialized: false,
}

const appReducer = (state = initialState, action: any): IAppInitialState => {
    switch (action.type) {
        case ActionTypes.INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default :
            return {
                ...state
            }
    }
}

export const initializedSuccess = () : IInitializedSuccessAction => ({
    type: ActionTypes.INITIALIZED_SUCCESS,
})

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

export default appReducer