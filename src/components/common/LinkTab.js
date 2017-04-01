import React, { Component, PropTypes } from 'react';
import './common.css';
import { Link } from 'react-router-dom'

export default class LinkTab extends Component {
    static propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            to: PropTypes.string,
            isActive: PropTypes.bool,
            label: PropTypes.string.isRequired
        }))
    }

    render() {
        const { tabs } = this.props;
        return (
            <ul className="link-tabs">
                {tabs.map((tab, index) => {
                    return (<li className="link-tab" key={index}>
                        {tab.isActive ? <span className="theme-border-color theme-color">{tab.label}</span> :
                            <Link className="link theme-border-color" to={tab.to}>{tab.label}</Link>}
                    </li>);
                })}
            </ul>
        )
    }
}