
import React, { useRef, useLayoutEffect, useEffect } from "react";

function CanvasStats(props) {
  const {
    width = 310,
    height = 230,
  } = props;

  const canvas = useRef(null);

  var data = [{
    "d": "Sep 03",
        "v": 153
  }, {
    "d": "Sep 04",
        "v": 121
  }, {
    "d": "Sep 05",
        "v": 128
  }, {
    "d": "Sep 06",
        "v": 153
  }, {
    "d": "Sep 07",
        "v": 112
  }, {
    "d": "Sep 08",
        "v": 63
  }, {
    "d": "Sep 09",
        "v": 128
  }, {
    "d": "Sep 10",
        "v": 130
  }, {
    "d": "Sep 11",
        "v": 154
  }, {
    "d": "Sep 12",
        "v": 142
  }, {
    "d": "Sep 13",
        "v": 118
  }, {
    "d": "Sep 14",
        "v": 107
  }, {
    "d": "Sep 15",
        "v": 72
  }, {
    "d": "Sep 16",
        "v": 113
  }];
 

  useLayoutEffect(() => {
    const context = canvas.current.getContext("2d");

    /*
    context.save();
    context.scale(pixelRatio, pixelRatio);
    context.fillStyle = "hsl(0, 0%, 95%)";
    context.fillRect(0, 0, width, height);
*/
/*

var
  cellWidth = 60,
  cellHeight = 50,
  fontSize = "10px",
  cellsWide = 14,
  cellsHigh = 10,
  strokeColour = "#ccc",
  tableWidth = (cellWidth * cellsWide),
  tableHeight = (cellHeight * cellsHigh),
  padding = 90,
  totalVisits = 0,
  xInterval = 50,
  xTotal = 0,
  linePosX = padding,
  linePosY = padding + tableHeight;
var linePosX = padding,
  linePosY = padding + tableHeight;

ctx.beginPath();
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.strokeStyle = 'black';

ctx.moveTo(padding, tableHeight + padding);

//loop through the data
for (var i = 0; i < data.length; i++) {
  ctx.lineTo((i * cellWidth) + cellWidth + padding, (tableHeight + padding) - data[i].v);
}

linePosX = (data.length - 1) * cellWidth + padding + cellWidth;
linePosY = (tableHeight + padding) - data[data.length - 1].v;
ctx.lineTo(linePosX, tableHeight + padding);
ctx.fillStyle = "rgb(200,200,200)";
ctx.closePath();
ctx.fill();

ctx.stroke();

*/
var data = [ [ "John", 15 ], [ "Bob", 9 ], [ "Beth", 8 ], [ "Rick", 10 ], [ "liza", 11 ] ]; 
var colors = [ "blue", "red", "yellow", "green", "black" ]; 
 
 
// get length of data array 
var dataLength = data.length; 
// declare variable to store the total of all values 
var total = 0; 
 
// calculate total 
for( var i = 0; i < dataLength; i++ ){ 
    // add data value to total 
    total += data[ i ][ 1 ]; 
} 
 
// declare X and Y coordinates of the mid-point and radius 
var x = 100; 
var y = 100; 
var radius = 100; 
 
// declare starting point (right of circle) 
var startingPoint = 0; 
 
for( var i = 0; i < dataLength; i++ ){ 
    // calculate percent of total for current value 
    var percent = data[ i ][ 1 ] * 100 / total; 
 
    // calculate end point using the percentage (2 is the final point for the chart) 
    var endPoint = startingPoint + ( 2 / 100 * percent ); 
 
    // draw chart segment for current element 
    context.beginPath();    
    // select corresponding color 
    context.fillStyle = colors[ i ]; 
    context.moveTo( x, y ); 
    context.arc( x, y, radius, startingPoint * Math.PI, endPoint * Math.PI );     
    context.fill(); 
 
    // starting point for next element 
    startingPoint = endPoint;  
  
    // draw labels for each element 
    context.rect( 220, 25 * i, 15, 15 ); 
    context.fill(); 
    context.fillStyle = "black"; 
    context.fillText( data[ i ][ 0 ] + " (" + data[ i ][ 1 ] + ")", 245, 25 * i + 15 ); 
}  
  
// draw title 
context.font = "20px Arial"; 
context.textAlign = "center"; 
context.fillText( "Awards", 100, 225 );
});
  const style = { width, height };
  return <canvas ref={canvas} width={width} height={height} style={style} />;
};



export default CanvasStats;