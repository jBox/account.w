import React, { Component } from 'react';
import './register.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import LinkTab from '../common/LinkTab';

export default class Register extends Component {
    render() {
        return (
            <div className="register-page">
                <Paper zDepth={1} style={{ padding: 50 }}>
                    <div className="nav-tab">
                        <LinkTab tabs={[{
                            to: '/login',
                            isActive: false,
                            label: "Login"
                        }, {
                            to: '/register',
                            isActive: true,
                            label: 'Register'
                        }]} />
                    </div>
                    <div>
                        <TextField
                            hintText="Nickname"
                            floatingLabelText="Nickname"
                        />
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
                        <div className="register-btn">
                            <RaisedButton label="Register" secondary={true} />
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}
