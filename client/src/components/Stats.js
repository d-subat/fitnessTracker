import React from 'react';
import CanvasStats from './CanvasStats';
import BarChart from './BarChart';

const Stats = (props) => (
    <>
<div className="stats">
    <h2>{props.name}</h2>
    <h2>{props.sum}</h2>    
    <CanvasStats data={props.data} chart={props.type}  />
</div>

<div className="stats">
    <h2>{props.name}</h2>
    <h2>{props.sum}</h2>    
    <BarChart  />
</div>
</>
)

export default Stats;
