import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import {thunk as thunkMiddleware} from "redux-thunk";
import appReducer from "./app-reducer";





let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})

let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware))


export default store;