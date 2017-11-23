import React from 'react';
import PropTypes from 'prop-types';
import TimeTicks from './../timer/time-ticks.component';

const TimerListEntry = ({ name, ticks }) => (
    <li>
        {name}: <TimeTicks ticks={ticks} />
    </li>
);

TimerListEntry.defaultProps = {
    name: 'timer-name',
    ticks: 0
};

TimerListEntry.propTypes = {
    name: PropTypes.string,
    ticks: PropTypes.number
};

export default TimerListEntry;
