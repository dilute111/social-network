import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import {render, screen} from "@testing-library/react";

let state = {
    p: [
        {id: 1, message: "Hello, this is my first post", likesCount: 12},
        {id: 2, message: "Hi, how are you?", likesCount: 0},
        {id: 3, message: "Blabla", likesCount: 26},
        {id: 4, message: "Yo", likesCount: 6},
        {id: 5, message: "Hello", likesCount: 1},
    ],
}

it('length of posts should be incremented', () => {
    let action = addPostActionCreator("ангуляй")

    let newState = profileReducer(state, action)
    expect(newState.p.length).toBe(6)
});

it('message of new post should be correct', () => {
    let action = addPostActionCreator("ангуляй")

    let newState = profileReducer(state, action)
    expect(newState.p[5].message).toBe("ангуляй")
});

it('length of messages after deleting should be decremented', () => {
    let action = deletePost(1)

    let newState = profileReducer(state, action)
    expect(newState.p.length).toBe(4)
});
it(`length shouldn't changed if id is incorrect`, () => {
    let action = deletePost(1000)

    let newState = profileReducer(state, action)
    expect(newState.p.length).toBe(5)
});


