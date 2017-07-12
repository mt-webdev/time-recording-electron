import React, { Component } from 'react';

class ControlPanel extends Component {
    render() {
        return (
            <div className="control-panel">
                <button onClick={this.props.startStop}  className={this.props.runState ? 'fa fa-pause':'fa fa-play'}></button>
                <button onClick={this.props.reset} className="fa fa-refresh"></button>
                {/* <button className="remove">&#128473;</button> */}
                <button onClick={this.props.subLunchBreak} className="fa fa-rotate-left"></button>
            </div>
        );
    }
}

export default ControlPanel;