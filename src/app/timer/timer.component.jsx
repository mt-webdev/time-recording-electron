import React, { Component } from 'react';
import ControlPanel from './control-panel/control-panel.component';
import TimerName from './timer-name/timer-name.component';

export default class Timer extends Component {

    timerWrapperClasses;
    interval;
    displayTime;
    initDate;

    constructor() {
        super();
        this.state = {
            run: false,
            notified: false
        };

        this.initDate = new Date(2017, 1, 1, 0, 0, 0, 0);

        this.timerWrapperClasses = [
            'timer-wrapper',
            this.state.run ? 'active' : ''
        ].join(' ');

        this.rename = this.rename.bind(this);
        this.toggle = this.toggle.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
    }

    reset() {
        this.speak('timer zurückgesetzt');
        clearInterval(this.interval);
        this.setState({ run: false });
        this.props.update(this.props.idx, 0);
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

            this.timerWrapperClasses = [
                'timer-wrapper',
                this.state.run ? 'active' : ''
            ].join(' ');

            return { run: shouldRun };
        });
    }

    start() {
        this.speak('timer gestartet');
        this.interval = setInterval(() => {
            this.props.update(this.props.idx, this.props.timer.t + 1);
        }, 1000);
    }

    stop() {
        this.speak('timer pausiert');
        clearInterval(this.interval);
    }


    rename(newName) {
        this.props.rename(this.props.idx, newName);
    }

    updateDisplayName() {
        const date = new Date(this.initDate.setHours(0, 0, this.props.timer.t, 0));
        this.displayTime = date.toLocaleTimeString();
        this.notify(date);
    }

    notify(date) {
        const options = {
            body: 'Go Home!'
        };

        const displayNotification = () => new Notification('Time-Recording', options);
        const setNotifiedState = () => this.setState({ notified: true });

        if (!this.state.notified && date.getHours() === 8) {
            displayNotification();
            setNotifiedState();
        }
        else if (date.getHours() >= 8 && date.getMinutes() > 9 && date.getSeconds() === 0 && date.getMinutes() % 5 === 0) {
            // renotify every 5 minutes
            displayNotification();
        }
    }

    speak(text) {
        if (!speechSynthesis.speaking) {
            const utter = new SpeechSynthesisUtterance(text);
            utter.rate = 2;
            utter.volume = 2;
            speechSynthesis.speak(utter);
        }
    }

    render() {
        console.log('this', this);
            this.updateDisplayName();
        return (
            <div className={this.timerWrapperClasses}>
                <TimerName name={this.props.timer.name}
                    rename={this.rename} />

                <div className="timer">{this.displayTime}</div>

                <ControlPanel
                    reset={this.reset}
                    runState={this.state.run}
                    startStop={this.toggle} />
            </div>
        );
    }

    componentWillUnmount() {
        this.stop();
    }
}

