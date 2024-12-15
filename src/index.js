import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import store from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";

let rerenderEntireTree = (props) => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <BrowserRouter>
            <App state={props} dispatch={store.dispatch.bind(store)} store={store} />
            </BrowserRouter>
        </React.StrictMode>
    );
}

rerenderEntireTree(store.getState()) // вызов функции отрисовывающей страницу

store.subscribe(() => {
    let state = store.getState()

    rerenderEntireTree(state)
}); // передача функции, чтобы можно было вызывать перерисовку извне

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
