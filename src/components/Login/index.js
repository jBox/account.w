import React, { Component } from 'react';
import './login.css';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import LinkTab from '../common/LinkTab';

export default class Login extends Component {
    render() {
        return (
            <div className="login-page">
                <Paper zDepth={1} style={{ padding: 50 }}>
                    <div className="nav-tab">
                        <LinkTab tabs={[{
                            to: '/login',
                            isActive: true,
                            label: "Login"
                        }, {
                            to: '/register',
                            isActive: false,
                            label: 'Register'
                        }]} />
                    </div>
                    <div>
                        <TextField
                            hintText="User Name"
                            floatingLabelText="User Name"
                        />
                    </div>
                    <div>
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password"
                        />
                    </div>
                    <div>
                        <div className="remember-me-checkbox">
                            <Checkbox label="Remember me?" />
                        </div>
                    </div>
                    <div>
                        <div className="sign-in-btn">
                            <RaisedButton label="Sign in" primary={true} />
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}
