import React from 'react';

export default class TimerList extends React.Component {

    constructor() {
        super();
    }

    list() {
        return this.props.timers.map(timer => <li key={this.props.timers.keyOf(timer)}>{timer.name}<i>{timer.t}</i></li>)
    }

    render() {
        return (
            <div className="timer-list">
                <ul>
                    {this.list()}
                </ul>
            </div>
        );
    }
}