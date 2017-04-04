import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
//import './material_icons.css';
import './bootstrap.css';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import RouteWithSubRoutes from './common/RouteWithSubRoutes';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    injectTapEventPlugin();
  }

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider>
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
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}
