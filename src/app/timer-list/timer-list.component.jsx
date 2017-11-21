import React from 'react';

export default class TimerList extends React.Component {

    constructor() {
        super();
    }

    list() {
        debugger;
        // return this.props.timers.map(timer => <li>{timer.name}<i>{timer.t}</i></li>)
        return <li>Test</li>;
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