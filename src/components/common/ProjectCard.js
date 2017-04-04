import React, { Component, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Avatar from 'material-ui/Avatar';
import NameAvatar from './NameAvatar';

export default class ProjectCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    static propTypes = {
        project: PropTypes.object
    }

    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };

    handleToggle = (event, toggle) => {
        this.setState({ expanded: toggle });
    };

    handleExpand = () => {
        this.setState({ expanded: true });
    };

    handleReduce = () => {
        this.setState({ expanded: false });
    };

    getBasicInfo = () => {
        return (<div className="project-basic-info">
            <span className="project-info-title"></span>
        </div>)
    }

    getSaleInfo = () => {

        return (<div className="project-sale-info">
            <span className="project-info-title"></span>
        </div>)
    }

    getProcurementsInfo = () => {

        return (<div className="project-procurements-info">
            <div className="project-procurement-info">
                <span className="project-info-title"></span>
            </div>
        </div>)
    }

    render() {
        const { project } = this.props;
        return (
            <div className="project-card">
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        title={<span>{project.sale.projectName} (<code>{project.contractId}</code>)</span>}
                        subtitle={project.sale.client}
                        avatar={(<div className="project-avatars">
                            {project.logistics.map(logistic => (<NameAvatar className="avatar-icon" name={logistic} key={logistic} />))}
                            {project.principals.map(principal => (<NameAvatar className="avatar-icon" name={principal} key={principal} />))}
                        </div>)}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText>
                        <div className="project-item"><span>项目金额</span><code>￥{project.sale.projectAmount}</code></div>
                        <div className="project-item"><span>质保金</span><code>￥{project.sale.qualityAmount}</code></div>
                        <div className="project-item"><span>开票日期</span><code>{project.sale.billingDate}</code></div>
                        <div className="project-item"><span>开票金额</span><code>￥{project.sale.billingAmount}</code></div>
                    </CardText>
                    <CardText expandable={true}>
                        {this.getBasicInfo()}
                        {this.getSaleInfo()}
                        {this.getProcurementsInfo()}
                    </CardText>
                    <CardActions>
                        <FlatButton label="客户回款" primary={true} onTouchTap={this.handleExpand} />
                        <FlatButton label="采购付款" primary={true} onTouchTap={this.handleExpand} />
                        <FlatButton label="采购回票" primary={true} onTouchTap={this.handleExpand} />
                        <FlatButton label="编辑项目" secondary={true} onTouchTap={this.handleReduce} />
                    </CardActions>
                </Card>
            </div>
        );
    }
}