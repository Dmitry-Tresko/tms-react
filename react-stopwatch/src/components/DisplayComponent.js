import React from 'react';

function DisplayComponent(props) {
    return (
        <React.Fragment>
            <span className="stopwatch-display-component">{(props.time.hour >= 10) ? props.time.hour : "0" + props.time.hour}</span>
            <span className="stopwatch-display-colon">:</span>
            <span className="stopwatch-display-component">{(props.time.min >= 10) ? props.time.min : "0" + props.time.min}</span>
            <span className="stopwatch-display-colon">:</span>
            <span className="stopwatch-display-component">{(props.time.sec >= 10) ? props.time.sec : "0" + props.time.sec}</span>
            <span className="stopwatch-display-colon">:</span>
            <span className="stopwatch-display-component">{(props.time.msec >= 10) ? props.time.msec : "0" + props.time.msec}</span>
        </React.Fragment>
    );
}

export default DisplayComponent;