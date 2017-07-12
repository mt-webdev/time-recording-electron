import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class TimerName extends Component {
    constructor() {
        super();

        this.state = {
            notify: true,
            disabled: true
        };

        this.rename = this.rename.bind(this);
        this.toggleRename = this.toggleRename.bind(this);
        this.toggleNotify = this.toggleNotify.bind(this);
    }

    toggleRename() {
        this.setState({ disabled: !this.state.disabled }, () => {
            const listenOutsideClicks = ((evt) => {
                if (evt.target.id !== 'inputName') {
                    this.setState({ disabled: !this.state.disabled });
                    window.removeEventListener('click', listenOutsideClicks);
                }
            }).bind(this);

            if (!this.state.disabled) {
                window.addEventListener('click', listenOutsideClicks);
                return;
            }
        });
    }

    rename(evt) {
        this.props.rename(evt.target.value);
        ReactDOM.findDOMNode(this.refs.inputName).focus();
    }

    toggleNotify() {
        this.setState(p => ({ notify: !p.notify }));
        this.props.toggleNotify();
    }

    render() {
        return (
            <div className="timer-name">
                {this.state.disabled ?
                    <span className="timer-name-input" onDoubleClick={this.toggleRename}>{this.props.name}</span>
                    :
                    <input id="inputName" ref="inputName" className="timer-name-input" maxLength="10" minLength="3"
                        onDoubleClick={this.toggleRename}
                        autoFocus={true}
                        disabled={this.state.disabled}
                        value={this.props.name}
                        onChange={this.rename} />}
                <div onClick={this.toggleNotify} className={this.state.notify ? 'notify fa fa-bell-o' : 'notify fa fa-bell-slash-o'}></div>
            </div>
        );
    }
}

export default TimerName;
