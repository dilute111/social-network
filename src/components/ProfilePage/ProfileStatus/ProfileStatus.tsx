import React, {ChangeEvent} from 'react';
import {IProfileStatusProps, IProfileStatusState} from "../../../types/types";

class ProfileStatus extends React.Component <IProfileStatusProps, IProfileStatusState> {

    state = {
        editMode: false,
        status: this.props.status,
    }

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: IProfileStatusProps, prevState: IProfileStatusState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status,
            })
        }
    }

    render() {

        return (
            <div>
                {!this.state.editMode ? (
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "------"}</span>
                    </div>) : (
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}
                               value={this.state.status}/>
                    </div>)}
            </div>
        )
    }
}


export default ProfileStatus;