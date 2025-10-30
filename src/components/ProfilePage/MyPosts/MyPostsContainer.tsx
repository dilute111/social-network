import {addPostActionCreator, updateNewPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {IActions, IMyPostsContainerDispatch, IMyPostsContainerProps} from "../../../types/types";
import {RootState} from "../../../redux/redux-store";
import {Dispatch} from "redux";


const mapStateToProps = (state: RootState): IMyPostsContainerProps => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        users: state.usersPage.users,
    }
}
const mapDispatchToProps = (dispatch: Dispatch<IActions>): IMyPostsContainerDispatch => {
    return {
        updateNewPostText: (text) => {
            let action = updateNewPostActionCreator(text)
            dispatch(action)
        },
        addPost: (text) => {
            dispatch(addPostActionCreator(text))
        },
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;