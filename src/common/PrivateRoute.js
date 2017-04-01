import React from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'

export default ({ component, ...rest }) => (
    <Route {...rest} render={props => (
        true ? (React.createElement(component, props)): 
        (<Redirect to={{ pathname: '/login', state: { from: props.location }}}/>)
  )} />
);