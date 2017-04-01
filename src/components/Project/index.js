import React, { Component, PropTypes } from 'react';
import './project.css';
import RouteWithSubRoutes from '../../common/RouteWithSubRoutes';
import { NavLink, Switch } from 'react-router-dom'

export default class Project extends Component {

    static propTypes = {
        routes: PropTypes.array.isRequired
    }

    render() {
        const { routes } = this.props;
        return (
            <div>
                <div className="theme-background-color page-background-bar">
                    <div className="container">
                        <div className="report-links">
                            <NavLink className="nav-link" to="/report/summary" activeClassName="active">
                                Summary</NavLink>
                            <NavLink className="nav-link" to="/report/sale" activeClassName="active">
                                Sale</NavLink>
                            <NavLink className="nav-link" to="/report/purchase" activeClassName="active"
                            >Purchase</NavLink>
                            <NavLink className="nav-link" to="/report/cost" activeClassName="active">
                                Cost</NavLink>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <Switch>
                        {routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </div>
            </div>
        );
    }
}
