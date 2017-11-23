import React from 'react';
import PropTypes from 'prop-types';
import TimerListEntry from './timer-list-entry.component';
import { List } from 'immutable';

export default class TimerList extends React.Component {

    constructor() {
        super();
    }

    items() {
        return this.props.timers.map(timer => <TimerListEntry key={timer.id} name={timer.name} ticks={timer.ticks} />);
    }

    render() {
        return (
            <ul className="timer-list">
                {this.items()}
            </ul>
        );
    }
}

TimerList.propTypes = {
    timers: PropTypes.instanceOf(List)
};