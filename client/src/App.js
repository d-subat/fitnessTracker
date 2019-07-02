import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Exercises from "./components/Exercises";
import Activities from "./components/Activities";
import Logs from "./components/Logs";


import "./App.css";

const routes = [  
  
  { path: "/exercises", name: "Exercises", component: Exercises },
  { path: "/activities", name: "Activities", component: Activities },
  { path: "/logs", name: "Exercise Logs", component: Logs },
  { path: "/profile", name: "Profile", component: Profile },
];

function App() {
  const [sideBar, toggleSideBar] = useState(true);

  return (
    <Router>
      
      <Header sideBar={sideBar} toggleSideBar={toggleSideBar} />
      <div className="container">
        <Sidebar routes={routes} sideBar={sideBar} />
        <main className={sideBar && "active" }>
        <Route path="/" exact={true} render={() => <Home />}/>
          <Route path="/dashboard" render={() => <Dashboard routes={routes} />}/>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}             
            />
          ))}
        </main>
      </div>
    </Router>
  );
}


export default App;
