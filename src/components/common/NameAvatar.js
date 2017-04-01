import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class NameAvatar extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        className: PropTypes.string
    }

    render() {
        const { name, className } = this.props;
        const firstLetter = name.length > 0 ? name[0] : "";
        return (
            <div className={classNames(className, "name-avatar")} title={name} >
                <span>{firstLetter}</span>
            </div>
        );
    }
}