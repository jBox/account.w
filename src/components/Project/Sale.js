import React, { Component, PropTypes } from "react";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import assign from "lodash/assign";
import {
    convertProp,
    dateToString,
    stringToDate,
    stringToNumber,
    originally,
    compareObjectWithProps
} from "../../common/utils";

export default class Sale extends Component {
    constructor(props, context) {
        super(props, context);
        this.changeHandlers = {};
        this.state = {
            sale: {}
        }
    }

    static defaultProps = {
        onChange: () => { }
    }

    static propTypes = {
        onChange: PropTypes.func,
        sale: PropTypes.shape({
            client: PropTypes.string, //客户名称
            projectName: PropTypes.string, //产品名称
            projectAmount: PropTypes.number, //项目金额
            qualityAmount: PropTypes.number, //质保金
            qualityDate: PropTypes.string, //付质保金日期
            qualityYears: PropTypes.number, //质保期
            serviceAmount: PropTypes.number, //中标服务费
            billingAmount: PropTypes.number, //开票金额
            billingDate: PropTypes.string //开票日期
        }).isRequired,
        dateTimeFormat: PropTypes.func.isRequired
    }

    buildChangeHandler = (target, format) => {
        if (!this.changeHandlers[target]) {
            console.log("Sale", "buildChangeHandler", target);
            const handleChanged = (event/*object*/, newValue/*string or date*/) => {
                console.log("Sale.buildChangeHandler", target, newValue);
                const { onChange, sale } = this.props;
                onChange(assign({}, sale, { [target]: (format || originally)(newValue) }));
            };

            this.changeHandlers[target] = handleChanged.bind(this);
        }

        return this.changeHandlers[target];
    }

    componentWillReceiveProps(nextProps) {
        const saleProps = ["client", "projectName", "projectAmount", "qualityAmount", "qualityDate", "qualityYears", "serviceAmount", "billingAmount", "billingDate"];
        if (!compareObjectWithProps(nextProps.sale, this.props.sale, saleProps)) {
            this.setState(assign({}, this.state, { sale: nextProps.sale }));
        }
    }

    render() {
        const { dateTimeFormat } = this.props;
        const { sale } = this.state;
        return (
            <Row>
                <Col xs={6} md={4}>
                    <TextField
                        hintText="客户名称"
                        floatingLabelText="客户名称"
                        onChange={this.buildChangeHandler("client")}
                        value={sale.client} />
                </Col>
                <Col xs={6} md={4}>
                    <TextField
                        hintText="产品名称"
                        floatingLabelText="产品名称"
                        onChange={this.buildChangeHandler("projectName")}
                        {...convertProp("value", sale.projectName) } />
                </Col>
                <Col xs={6} md={4}>
                    <TextField
                        hintText="项目金额"
                        floatingLabelText="项目金额"
                        onChange={this.buildChangeHandler("projectAmount", stringToNumber)}
                        {...convertProp("value", sale.projectAmount) } />
                </Col>
                <Col xs={6} md={4}>
                    <TextField
                        hintText="质保金"
                        floatingLabelText="质保金"
                        onChange={this.buildChangeHandler("qualityAmount", stringToNumber)}
                        {...convertProp("value", sale.qualityAmount) } />
                </Col>
                <Col xs={6} md={4}>
                    <DatePicker
                        hintText="质保金付款日期"
                        floatingLabelText="质保金付款日期"
                        DateTimeFormat={dateTimeFormat}
                        autoOk
                        cancelLabel="取消"
                        locale="zh"
                        onChange={this.buildChangeHandler("qualityDate", dateToString)}
                        {...convertProp("value", stringToDate(sale.qualityDate)) }
                    />
                </Col>
                <Col xs={6} md={4}>
                    <TextField
                        hintText="质保期"
                        floatingLabelText="质保期（年）"
                        onChange={this.buildChangeHandler("qualityYears", stringToNumber)}
                        {...convertProp("value", sale.qualityYears) } />
                </Col>
                <Col xs={6} md={4}>
                    <TextField
                        hintText="中标服务费"
                        floatingLabelText="中标服务费"
                        onChange={this.buildChangeHandler("serviceAmount", stringToNumber)}
                        {...convertProp("value", sale.serviceAmount) } />
                </Col>
                <Col xs={6} md={4}>
                    <TextField
                        hintText="开票金额"
                        floatingLabelText="开票金额"
                        onChange={this.buildChangeHandler("billingAmount", stringToNumber)}
                        {...convertProp("value", sale.billingAmount) } />
                </Col>
                <Col xs={6} md={4}>
                    <DatePicker
                        hintText="开票日期"
                        floatingLabelText="开票日期"
                        DateTimeFormat={dateTimeFormat}
                        autoOk
                        cancelLabel="取消"
                        locale="zh"
                        onChange={this.buildChangeHandler("billingDate", dateToString)}
                        {...convertProp("value", stringToDate(sale.billingDate)) } />
                </Col>
            </Row>
        );
    }
}