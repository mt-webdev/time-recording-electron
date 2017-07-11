import React, { Component } from 'react';
import ControlPanel from './control-panel/control-panel.component';
import TimerName from './timer-name/timer-name.component';

export default class Timer extends Component {

    interval;
    displayTime;
    init;

    constructor() {
        super();
        this.state = { run: false };

        this.init = new Date(2017, 1, 1, 0, 0, 0, 0);

        this.rename = this.rename.bind(this);
        this.toggle = this.toggle.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }

    toggle() {
        this.setState(p => {
            const shouldRun = !p.run;

            if (shouldRun) {
                this.start();
            }
            else {
                this.stop();
            }

            return { run: shouldRun };
        });
    }

    start() {
        this.interval = setInterval(() => {
            this.displayTime = new Date(this.init.setSeconds(this.props.timer.t)).toLocaleTimeString();
            this.props.update(this.props.idx, this.props.timer.t + 1);
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
    }


    rename(newName) {
        this.props.rename(this.props.idx, newName);
    }

    render() {
        return (
            <div className="timer-wrapper">
                <TimerName name={this.props.timer.name} 
                rename={this.rename} />

                <div className="timer">{this.displayTime}</div>
                
                <ControlPanel runState={this.state.run} 
                startStop={this.toggle} />
            </div>
        );
    }

    componentWillUnmount() {
        this.stop();
    }
}

