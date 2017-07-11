import React, { Component } from 'react';

class ControlPanel extends Component {
    render() {
        return (
            <div className="control-panel">
                <button onClick={this.props.startStop}  className={this.props.runState ? 'stop':'run'}></button>
                <button className="reset">&#128472;</button>
                <button className="remove">&#128473;</button>
            </div>
        );
    }
}

export default ControlPanel;