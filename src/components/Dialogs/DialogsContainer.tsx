import {messagesActions} from "../../redux/messages-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {RootState} from "../../redux/redux-store";




let mapStateToProps = (state: RootState) => {
    return {
        messagesPage: state.messagesPage,
    }
}



export default compose(
    connect(mapStateToProps, { ...messagesActions }),
    withAuthRedirect
)(Dialogs)