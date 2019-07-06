import React from 'react';
import CanvasStats from './CanvasStats';

const Stats = (props) => (
<div className="stats">
    <h2>{props.name}</h2>
    <h2>{props.sum}</h2>
    <CanvasStats data={props.data} chart={props.type}  />
</div>
)

export default Stats;
