import React from 'react';
import PropTypes from 'prop-types';

const twoDigits = (value) => value < 10 ? `0${value}` : `${value}`;

const getTime = (ticks) => {
    const hh = Math.floor(ticks / 3600);
    const mm = Math.floor((ticks % 3600) / 60);
    const ss = ticks % 60;

    return `${twoDigits(hh)}:${twoDigits(mm)}:${twoDigits(ss)}`;
}

const TimeTicks = ({ ticks }) => getTime(ticks);

export default TimeTicks;

TimeTicks.propTypes = {
    ticks: PropTypes.number
};

TimeTicks.defaultProps = {
    ticks: 0
};
