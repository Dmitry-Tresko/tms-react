import React, { useState, useCallback } from 'react';

import DisplayComponent from './components/DisplayComponent';
import ButtonComponent from './components/ButtonComponent';

import './Stopwatch.css';

function Stopwatch() {
  const [time, setTime] = useState({ msec: 0, sec: 0, min: 0, hour: 0 });
  const [status, setStatus] = useState('stopped');
  const [intervalID, setIntervalID] = useState(null);

  let msecCount = time.msec;
  let secCount = time.sec;
  let minCount = time.min;
  let hourCount = time.hour;

  const tick = () => {
    msecCount++;

    if (msecCount === 100) {
      secCount++;
      msecCount = 0;
    }

    if (secCount === 60) {
      minCount++;
      secCount = 0;
    }

    if (minCount === 60) {
      hourCount++;
      minCount = 0;
    }

    setTime({ msec: msecCount, sec: secCount, min: minCount, hour: hourCount });
  }

  const onClickStart = () => {
    setStatus('running');

    const intID = setInterval(tick, 10);
    setIntervalID(intID);
  }

  const onStopClick = useCallback(() => {
    setStatus('stopped');

    if (intervalID) {
      clearInterval(intervalID);
      setIntervalID(null);
    }
  }, [intervalID]);

  const onResetClick = useCallback(() => {
    setTime({ msec: 0, sec: 0, min: 0, hour: 0 });

    onStopClick();
  }, [onStopClick]);

  return (
    <div className="wrapper">
      <h1 className="title">React Stopwatch</h1>

      <div className="stopwatch-container">
        <div className="stopwatch-clock-display">
          <DisplayComponent time={time}></DisplayComponent>
        </div>

        <div className="stopwatch-btn-container">
          <ButtonComponent currentStatus={status} start={onClickStart} stop={onStopClick} reset={onResetClick}></ButtonComponent>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;