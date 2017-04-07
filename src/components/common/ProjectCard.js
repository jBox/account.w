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
        const { project } = this.props;
        return (<div className="project-basic-info">
            <div className="project-item"><span>内勤人员</span><code>{project.logistics.join(", ")}</code></div>
            <div className="project-item"><span>负责人</span><code>{project.principals.join(", ")}</code></div>
            <div className="project-item"><span>合同编号</span><code>{project.contractId}</code></div>
        </div>)
    }

    getSaleInfo = () => {
        const { project } = this.props;
        return (<div className="project-sale-info">
            <div className="project-info-title"><span>销售</span></div>
            <div className="project-item"><span>客户名称</span><code>{project.client}</code></div>
            <div className="project-item"><span>产品名称</span><code>{project.products.join("/")}</code></div>
            <div className="project-item"><span>项目金额</span><code>￥{project.amount}</code></div>
            <div className="project-item"><span>质保金</span><code>￥{project.qualityAmount}</code></div>
            <div className="project-item"><span>付质保金日期</span><code>{project.qualityDate}</code></div>
            <div className="project-item"><span>中标服务费</span><code>￥{project.serviceAmount}</code></div>
            <div className="project-item"><span>开票金额</span><code>￥{project.billingAmount}</code></div>
            <div className="project-item"><span>开票日期</span><code>{project.billingDate}</code></div>
            {project.receiptPlans.map((plan, index) => {
                return (<div className="project-item" key={`plan_${index}`}><span>计划回款 #{index + 1}</span><code>￥{plan}</code></div>)
            })}
            {project.receiptActuals.map((actual, index) => {
                return (<div className="project-item" key={`actual_${index}`}><span>实际回款 #{index + 1}</span><code>￥{actual.amount} ({actual.date})</code></div>)
            })}
        </div>)
    }

    getProcurementsInfo = () => {
        const { project } = this.props;
        return (<div className="project-procurements-info">
            {project.procurements.map((procurement, index) => {
                return (<div className="project-procurement-info" key={`procurement_${index}`}>
                    <div className="project-info-title"><span>采购 #{index + 1}</span></div>
                    <div className="project-item"><span>供货商</span><code>{procurement.supplier}</code></div>
                    <div className="project-item"><span>供货产品</span><code>{procurement.products}</code></div>
                    <div className="project-item"><span>采购金额</span><code>￥{procurement.amount}</code></div>
                    <div className="project-item"><span>付款方式</span><code>{procurement.paymentMode}</code></div>
                    {procurement.payments.map((p, index) => {
                        return (<div className="project-item" key={`payment_${index}`}><span>付款 #{index + 1}</span><code>￥{p.amount} ({p.date})</code></div>)
                    })}
                    <div className="project-item"><span>是否付全款</span><code>{procurement.fullDefrayed}</code></div>
                     {procurement.invoices.map((i, index) => {
                        return (<div className="project-item" key={`invoice_${index}`}><span>回票 #{index + 1}</span><code>￥{i.amount} ({i.date})</code></div>)
                    })}
                    <div className="project-item"><span>是否回完全票</span><code>{procurement.fullInvoiced}</code></div>
                    <div className="project-item"><span>备注</span><code>{procurement.remarks}</code></div>
                </div>)
            })}
        </div>)
    }

    render() {
        const { project } = this.props;
        return (
            <div className="project-card">
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        title={<span>{project.products.join("/")} (<code>{project.contractId}</code>)</span>}
                        subtitle={project.client}
                        avatar={(<div className="project-avatars">
                            {project.logistics.map(logistic => (<NameAvatar className="avatar-icon" name={logistic} key={logistic} />))}
                            {project.principals.map(principal => (<NameAvatar className="avatar-icon" name={principal} key={principal} />))}
                        </div>)}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText>
                        <div className="project-item"><span>项目金额</span><code>￥{project.amount}</code></div>
                        <div className="project-item"><span>质保金</span><code>￥{project.qualityAmount}</code></div>
                        <div className="project-item"><span>开票日期</span><code>{project.billingDate}</code></div>
                        <div className="project-item"><span>开票金额</span><code>￥{project.billingAmount}</code></div>
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