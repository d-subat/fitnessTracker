import React from "react";
import Stats from "./Stats";

const Dashboard = props => {
  const today = new Date();

  const month = [
    "Jan",    "Feb",    "Mar",    "Apr",    "Mai",    "Jun",    "Jul",    "Aug",    "Sep",    "Oct",    "Nov",    "Dec"
  ];

  const lastweek =
    Array.from(Array(7), () => 0).map(
      (_, idx) =>
        new Date(today.getTime() - idx * 86400000).getDate() +
        "." +
        month[new Date(today.getTime() - idx * 86400000).getMonth()]
    ).reverse()
  
  return (
    <>
      <section>
        <h4>Overview</h4>
        <h1>Statistics Panel</h1>

        <div className="container">
        <div className="box">
Today:

SPorting Goals

        </div>
          <Stats
            sum="2390"
            type="pie"
            labels={["Swimming", "Soccer", "Skateboard", "Gymnastics", "Running", "Bike"]}
            data={[4, 5, 19, 15, 14, 11]}
            name="Activities"
          />
          <Stats
            sum="9"
            type="pie"
            labels={lastweek}
            data={[8, 7, 13, 10, 10]}
            name="Days"
          />
          <Stats
            sum="162"
            type="bar"
            labels={lastweek}
            data={[2, 1, 79, 17, 12, 23, 8]}
            name="Exercises"
          />
          <Stats
            sum="72"
            type="bar"
            labels={lastweek}
            data={[12, 3, 11, 5, 10, 59, 37]}
            name="Kalories"
          />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
