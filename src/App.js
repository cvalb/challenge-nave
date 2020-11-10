import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './css/estilos.css';
import Login from './components/Login';
import Home from './components/Home';

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

class App extends Component {
    render() {
      return (
        <Router>
        <div className="App">
          <Switch>
          <Route exact path="/"
                render={() => {
                    return (
                      isAuthenticated() ?
                      <Redirect to="/navers" /> :
                      <Redirect to="/login" /> 
                    )
                }}
              />
            <Route path="/login">
              <Login/>
            </Route>
            <PrivateRoute path="/navers">
              <Home/>
            </PrivateRoute>
            <Route path="*" render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
        </Router>
      );
    }
}

export default App;
