import { connect } from 'react-redux';
import Friends from './Friends';
import { RootState } from "../../../redux/redux-store";
import { IDialogs } from "../../../types/types";

// Типы для пропсов
interface IFriendsComponentProps {
    friends: IDialogs[];
    totalFriendsCount: number;
}

const mapStateToProps = (state: RootState): IFriendsComponentProps => {

    return {
        friends: state.messagesPage?.d.slice(0, 3),
        totalFriendsCount: state.messagesPage?.d.length
    }
};

// Создаем connector
const connector = connect(mapStateToProps);

// Экспортируем подключенный компонент
export default connector(Friends);