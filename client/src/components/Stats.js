import React, { Component } from "react";
import ToolTip from "./Tooltip";

/*
const sStats = (props) => (
    <>

<div className="stats">
    <h2>{props.name}</h2>
    <h2>{props.sum}</h2>    
    <Charts  data={props.data} chart={props.type}  />
</div>
</>
)
*/

class Stats extends Component {
  createPath = () => {
    let lines = [];
    this.props.data.map((value, index) =>
      lines.push(index * (100 / (this.props.data.length - 1)) + ", " + value)
    );
    return lines.join(" ");
  };
  animate = name => {
    if (this.props.type === "bar") {
      var path = document.querySelector(`.${name}`);
      var length = path.getTotalLength();
      path.style.transition = "none";
      path.style.strokeDasharray = length + " " + length;
      path.style.strokeDashoffset = length;
      path.getBoundingClientRect();
      path.style.transition = "stroke-dashoffset 2s ease-in-out";
      path.style.strokeDashoffset = "0";
    }
  };
  componentDidMount() {
    this.animate(this.props.name);
  }

  render() {
    var colors = [
      "#43A19E",
      "#7B43A1",
      "#F2317A",
      "#FF9824",
      "#58CF6C",
      "#f8CF6C",
      "#0debd8"
    ];
    if (this.props.type === "bar") {
      return (
        <div className="stats">
          <h2>{this.props.name}</h2>
          <h2>{this.props.sum}</h2>
          <div class="chart">
            {this.props.data.map((value, index) => {
              return <Bar tipnr={index} value={value} color={colors[index]} />;
            })}
          </div>
          <svg
            viewBox="0 0 100 100"
            style={{
              width: "100%",
              border: "1px solid blue",
              stroke: "red",
              transform: "rotate(180deg) rotateY(180deg)"
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class={this.props.name}
              fill="none"
              stroke="red"
              stroke-width="2"
              strokeDashoffset="220"
              d={"M" + this.createPath()}
            />
          </svg>

          <div className="fieldrow">
            {this.props.labels.map((item, index) => {
              return (
                <>
                  <div
                    className="colorbox"
                    style={{ background: colors[index] }}
                  />{" "}
                  {this.props.labels[index]}
                </>
              );
            })}
          </div>
        </div>
      );
    }
    return (
      <div className="stats">
        <h2>{this.props.name}</h2>
        <h2>{this.props.sum}</h2>
        <Pie
          data={this.props.data}
          radius={180}
          hole={1}
          colors={colors}
          strokeWidth={3}
          labels={this.props.labels}
        />
      </div>
    );
  }
}

class Bar extends React.Component {
  render() {
    const { color, value } = this.props;

    const barStyle = {
      background: color,
      height: `${value}%`,
      width: 20,
      display: "inline-block",
      position: "relative"
    };

    return (
      <>
        <section className="bar">
          <strong>{value}%</strong>
          <div style={barStyle} title="PROFILE DETAILS" />
        </section>
      </>
    );
  }
}

function getAnglePoint(startAngle, endAngle, radius, x, y) {
  var x1, y1, x2, y2;

  x1 = x + radius * Math.cos((Math.PI * startAngle) / 180);
  y1 = y + radius * Math.sin((Math.PI * startAngle) / 180);
  x2 = x + radius * Math.cos((Math.PI * endAngle) / 180);
  y2 = y + radius * Math.sin((Math.PI * endAngle) / 180);

  return { x1, y1, x2, y2 };
}

class Pie extends Component {
  render() {
    var colors = this.props.colors,
      colorsLength = colors.length,
      labels = this.props.labels,
      hole = this.props.hole,
      radius = this.props.radius,
      diameter = radius * 2,
      self = this,
      sum,
      startAngle,
      d = null;

    sum = this.props.data.reduce(function(carry, current) {
      return carry + current;
    }, 0);
    startAngle = 0;

    return (
      <>
        <svg
          width={diameter}
          height={diameter}
          viewBox={"0 0 " + diameter + " " + diameter}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          {this.props.data.map((slice, sliceIndex) => {
            var angle, nextAngle, percent;

            nextAngle = startAngle;
            angle = (slice / sum) * 360;
            percent = (slice / sum) * 100;
            startAngle += angle;

            return (
              <Slice
                key={sliceIndex}
                value={slice}
                percent={self.props.percent}
                percentValue={percent.toFixed(1)}
                startAngle={nextAngle}
                angle={angle}
                radius={radius}
                hole={radius - hole}
                trueHole={hole}
                showLabel={labels}
                fill={colors[sliceIndex % colorsLength]}
                stroke={self.props.stroke}
                strokeWidth={self.props.strokeWidth}
              />
            );
          })}
        </svg>

        <div className="fieldrow">
          {this.props.labels.map((item, index) => {
            return (
              <>
                <div
                  className="colorbox"
                  style={{ background: colors[index] }}
                />{" "}
                {this.props.labels[index]}
              </>
            );
          })}
        </div>
      </>
    );
  }
}

class Slice extends Component {
  state = {
    path: "",
    x: 0,
    y: 0
  };
  componentWillReceiveProps() {
    this.setState({ path: "" });
    this.animate();
  }
  componentDidMount() {
    this.animate();
  }
  animate() {
    this.draw(0);
  }
  draw(s) {
    var p = this.props,
      path = [],
      a,
      b,
      c,
      self = this,
      step;

    step = p.angle / (37.5 / 2);

    if (s + step > p.angle) {
      s = p.angle;
    }

    // Get angle points
    a = getAnglePoint(
      p.startAngle,
      p.startAngle + s,
      p.radius,
      p.radius,
      p.radius
    );
    b = getAnglePoint(
      p.startAngle,
      p.startAngle + s,
      p.radius - p.hole,
      p.radius,
      p.radius
    );

    path.push("M" + a.x1 + "," + a.y1);
    path.push(
      "A" +
        p.radius +
        "," +
        p.radius +
        " 0 " +
        (s > 180 ? 1 : 0) +
        ",1 " +
        a.x2 +
        "," +
        a.y2
    );
    path.push("L" + b.x2 + "," + b.y2);
    path.push(
      "A" +
        (p.radius - p.hole) +
        "," +
        (p.radius - p.hole) +
        " 0 " +
        (s > 180 ? 1 : 0) +
        ",0 " +
        b.x1 +
        "," +
        b.y1
    );

    // Close
    path.push("Z");

    this.setState({ path: path.join(" ") });

    if (s < p.angle) {
      setTimeout(function() {
        self.draw(s + step);
      }, 16);
    } else if (p.showLabel) {
      c = getAnglePoint(
        p.startAngle,
        p.startAngle + p.angle / 2,
        p.radius / 2 + p.trueHole / 2,
        p.radius,
        p.radius
      );

      this.setState({
        x: c.x2,
        y: c.y2
      });
    }
  }
  render() {
    return (
      <g overflow="hidden">
        <path
          d={this.state.path}
          fill={this.props.fill}
          stroke={this.props.stroke}
          strokeWidth={this.props.strokeWidth ? this.props.strokeWidth : 3}
        />
        {this.props.showLabel && this.props.percentValue > 5 ? (
          <text
            x={this.state.x}
            y={this.state.y}
            fill="#fff"
            textAnchor="middle"
          >
            {this.props.percent
              ? this.props.percentValue + "%"
              : this.props.value}
          </text>
        ) : null}
      </g>
    );
  }
}

export default Stats;
