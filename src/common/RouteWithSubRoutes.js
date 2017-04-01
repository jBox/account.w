import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isString, isObject } from 'lodash';

export default (route) => {
  const routeProps = {
    path: route.path,
    exact: route.exact,
    strict: route.strict
  };

  return (<Route {...routeProps} render={props => {
    const { redirect } = route;
    if (isString(redirect)) {
      return (<Redirect to={redirect} />);
    } else if (isObject(redirect)) {
      return (<Redirect {...redirect} />);
    } else if (route.component) {
      return (<route.component {...props} routes={route.routes} />);
    }

    throw new Error("Unhandled route.");
  }} />);
}