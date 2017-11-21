'use-strict';

import ReactDOM from 'react-dom';
import React from 'react';
import { Set, List } from 'immutable';

// import TimerList from './app/timer-list/timer-list.component';
import Timer from './app/timer/timer.component';
import TimerList from './app/timer-list/timer-list.component';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      timers: new Map([
        [0, { name: 'init', t: 0 }],
        [0, { name: 'test', t: 0 }]
      ]),
    };

    this.addTimer = this.addTimer.bind(this);
    this.removeTimer = this.removeTimer.bind(this);
    this.renameTimer = this.renameTimer.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
  }

  addTimer(name) {
    this.setState((prev) => ({}));
  }

  removeTimer(key) {

  }

  renameTimer(key, newName) {
    this.setState((prev) => {
      const time = prev.timers.get(key).t;
      const updatedTimers = prev.timers;
      updatedTimers.set(key, { name: newName, t: time });

      return { timers: updatedTimers };
    });
  }

  updateTimer(key, time) {
    this.setState((prev) => {
      const timerName = prev.timers.get(key).name;
      const updatedTimers = prev.timers;
      updatedTimers.set(key, { name: timerName, t: time });

      return { timers: updatedTimers };
    });
  }
  render() {
    return (
      <div className="app-container">
        <h1 className="title">Time-Recording</h1>
        <Timer
          update={this.updateTimer}
          timer={this.state.timers.get(0)}
          idx={0}
          rename={this.renameTimer}
        />
        <TimerList timers={this.state.timers}
          add={this.addTimer}
          remove={this.removeTimer} />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
