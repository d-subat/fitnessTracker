import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Exercises from "./components/Exercises";
import Activities from "./components/Activities";
import Logs from "./components/Logs";
import Map from "./components/Map";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { withAuthentication } from './components/Session';

import "./App.css";



const routes = [  
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/dashboard", name: "Stats Panel", component: Dashboard },
  { path: "/exercises", name: "Exercises", component: Exercises },
  { path: "/activities", name: "Activities", component: Activities },
  { path: "/map", name: "Map", component: Map },
  { path: "/logs", name: "Exercise Logs", component: Logs },
  
];

function App() {
  const [sideBar, toggleSideBar] = useState(true);


  return (
    <Router>
      <Header sideBar={sideBar} toggleSideBar={toggleSideBar}  />
      <div className="container">
        <Sidebar routes={routes} sideBar={sideBar} />
        <main className={sideBar && "active" }>
          <Switch>
        <Route path="/" exact={true} render={() => <Login />}/>
          <Route path="/dashboard" render={() => <Dashboard routes={routes} />}/>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}             
            />
          ))}
           <Route path="/home" exact={true} render={() => <Home />}/>
           <Route component={NotFound} />
          </Switch>
        </main>
      </div>
      
    </Router>
  );
}



export default withAuthentication(App);
