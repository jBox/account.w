import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
//import './material_icons.css';
import './bootstrap.css';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import RouteWithSubRoutes from './common/RouteWithSubRoutes';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    injectTapEventPlugin();
  }
  render() {
    return (
      <Router>
        <div>
          <div className="container">
            <h3 className="theme-color">Ledger</h3>
          </div>
          <div className="page">
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </div>
        </div>
      </Router>
    );
  }
}

export default () => (<MuiThemeProvider><App /></MuiThemeProvider>);
