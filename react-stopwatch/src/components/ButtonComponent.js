import React from 'react';

function ButtonComponent(props) {
    return (
        <React.Fragment>
            {(props.currentStatus === 'stopped') ?
                <React.Fragment>
                    <button className="stopwatch-btn start-btn" onClick={props.start}>Start</button>
                    <button className="stopwatch-btn disabled-btn" onClick={props.stop}>Stop</button>
                    <button className="stopwatch-btn reset-btn" onClick={props.reset}>Reset</button>
                </React.Fragment> : ""
            }

            {(props.currentStatus === 'running') ?
                <React.Fragment>
                    <button className="stopwatch-btn disabled-btn" onClick={props.start}>Start</button>
                    <button className="stopwatch-btn stop-btn" onClick={props.stop}>Stop</button>
                    <button className="stopwatch-btn reset-btn" onClick={props.reset}>Reset</button>
                </React.Fragment> : ""
            }
        </React.Fragment>
    );
}

export default ButtonComponent;