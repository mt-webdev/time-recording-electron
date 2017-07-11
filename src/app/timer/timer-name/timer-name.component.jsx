import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class TimerName extends Component {
    constructor() {
        super();

        this.state = { disabled: true };

        this.rename = this.rename.bind(this);
        this.enableRename = this.enableRename.bind(this);
    }

    enableRename() {
        this.setState({ disabled: !this.state.disabled });
    }

    rename(evt) {
        this.props.rename(evt.target.value);
        ReactDOM.findDOMNode(this.refs.inputName).focus();
    }

    render() {
        return (
            <div className="timer-name">

                <input ref="inputName" className="timer-name-input" maxLength="10" minLength="3"
                autoFocus={true}
                disabled={this.state.disabled} 
                value={this.props.name} 
                onChange={this.rename} />

                <div className="edit-pen">
                    <span onClick={this.enableRename}>&#128393;</span>
                </div>

            </div>
        );
    }
}

export default TimerName;