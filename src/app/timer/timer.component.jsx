import React, { Component } from 'react';
import ControlPanel from './control-panel/control-panel.component';
import TimerName from './timer-name/timer-name.component';
import IdbDatabase from '../storage/IdbDatabase.class';

export default class Timer extends Component {

    timerWrapperClasses;
    interval;
    displayTime;
    initDate;
    _idb;

    constructor() {
        super();
        this.state = {
            run: false,
            notified: false,
            notify: true
        };

        this.initDate = new Date(2017, 1, 1, 0, 0, 0, 0);

        this.timerWrapperClasses = [
            'timer-wrapper',
            this.state.run ? 'active' : ''
        ].join(' ');

        this.rename = this.rename.bind(this);
        this.toggleTimer = this.toggleTimer.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.toggleNotify = this.toggleNotify.bind(this);
        this.subLunchBreak = this.subLunchBreak.bind(this);

        this._idb = new IdbDatabase({});
    }

    subLunchBreak() {
        const avgLunchTime = (60 * 30);
        if (this.props.t >= avgLunchTime) {
            this.speak('Mittagspause abgezogen');
            this.props.update(this.props.idx, this.props.t - avgLunchTime);
        }
    }

    toggleNotify() {
        this.setState(p => ({ notify: !p.notify }), () => {
            if (this.state.notify) {
                this.speak('Benachrichtigungen aktiviert');
            }
            else {
                this.speak('Benachrichtigungen deaktiviert');
            }
        });
    }

    reset() {
        this.speak('timer zurückgesetzt');
        clearInterval(this.interval);
        this.setState({ run: false });
        this.props.update(this.props.idx, 0);
    }

    toggleTimer() {
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
        this._idb.putStartTime(this.props.idx, this.props.timer);
        this.speak('timer gestartet');

        this.interval = setInterval(() => {
            this.props.update(this.props.idx, this.props.timer.t + 1);
        }, 1000);

    }

    stop() {
        this._idb.putEndTime(this.props.idx, this.props.timer);
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
        if (!this.state.notify)
            return;

        const displayNotification = (over) => new Notification('Time-Recording', { body: !over ? 'Go Home!' : `Go Home!\n+ ${over}` });
        const setNotifiedState = () => this.setState({ notified: true });

        if (!this.state.notified && date.getHours() === 8) {
            displayNotification();
            setNotifiedState();
        }
        // renotify every 5 minutes
        else if (date.getHours() >= 8 && date.getMinutes() > 4 && date.getSeconds() === 0 && date.getMinutes() % 5 === 0) {
            const overTime = ''.concat(
                `0${date.getHours() - 8}`,
                ' : ',
                `${date.getMinutes() < 10 ?
                    "0" + date.getMinutes() :
                    date.getMinutes()}`
            );



            displayNotification(overTime);
        }
    }

    speak(text) {
        if (!speechSynthesis.speaking) {
            const utter = new SpeechSynthesisUtterance(text);
            utter.rate = 1.5;
            utter.volume = 2;
            speechSynthesis.speak(utter);
        }
    }

    render() {
        this.updateDisplayName();
        return (
            <div className={this.timerWrapperClasses}>
                <TimerName name={this.props.timer.name}
                    toggleNotify={this.toggleNotify}
                    rename={this.rename} />

                <div className="timer">{this.displayTime}</div>

                <ControlPanel
                    reset={this.reset}
                    runState={this.state.run}
                    subLunchBreak={this.subLunchBreak}
                    startStop={this.toggleTimer} />
            </div>
        );
    }

    componentWillUnmount() {
        this.stop();
    }
}

