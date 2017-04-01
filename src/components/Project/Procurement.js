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
    arrToLine,
    lineToArr,
    stringToNumber,
    originally,
    compareObjectWithProps
} from "../../common/utils";

export default class Procurement extends Component {
    constructor(props, context) {
        super(props, context);
        this.changeHandlers = {};
        this.state = {
            purchase: {}
        };
    }

    static defaultProps = {
        onDelete: () => { },
        onChange: () => { }
    }

    static propTypes = {
        onDelete: PropTypes.func,
        onChange: PropTypes.func,
        purchase: PropTypes.shape({
            supplier: PropTypes.string, //供货商
            products: PropTypes.arrayOf(PropTypes.string), //供货产品
            purchaseAmount: PropTypes.number, //采购金额
            paymentMode: PropTypes.string, //付款方式
            paymentDate: PropTypes.string, //付款日期
            paymentAmount: PropTypes.number, //付款金额
            receiptDate: PropTypes.string, //回票日期
            receiptAmount: PropTypes.number, //回票金额
            remarks: PropTypes.string //备注
        }).isRequired,
        dateTimeFormat: PropTypes.func.isRequired
    }

    handleDelete = () => {
        const { onDelete, purchase } = this.props;
        onDelete(purchase);
    }

    buildChangeHandler = (target, format) => {
        if (!this.changeHandlers[target]) {
            console.log("Procurement", "buildChangeHandler", target);
            const handleChanged = (event/*object*/, newValue/*string or date*/) => {
                console.log("Procurement.buildChangeHandler", target, newValue);
                const { onChange, purchase } = this.props;
                onChange(assign({}, purchase, { [target]: (format || originally)(newValue) }));
            };

            this.changeHandlers[target] = handleChanged.bind(this);
        }

        return this.changeHandlers[target];
    }

    componentWillReceiveProps(nextProps) {
        const purchaseProps = ["supplier", "products", "purchaseAmount", "paymentMode", "paymentDate", "paymentAmount", "receiptDate", "receiptAmount", "remarks"];
        if (!compareObjectWithProps(nextProps.purchase, this.props.purchase, purchaseProps)) {
            this.setState(assign({}, this.state, { purchase: nextProps.purchase }));
        }
    }

    render() {
        const { dateTimeFormat } = this.props;
        const { purchase } = this.state;
        return (
            <Row>
                <Col xs={6} md={4}>
                    <TextField
                        hintText="供货商"
                        floatingLabelText="供货商"
                        onChange={this.buildChangeHandler("supplier")}
                        {...convertProp("defaultValue", purchase.supplier) } />
                </Col>
                <Col xs={6} md={4}>
                    <TextField
                        hintText="供货产品（回车换行）"
                        floatingLabelText="供货产品"
                        multiLine={true}
                        rows={1}
                        onChange={this.buildChangeHandler("products", lineToArr)}
                        {...convertProp("defaultValue", arrToLine(purchase.products)) } />
                </Col>
                <Col xs={6} md={4}>
                    <TextField
                        hintText="采购金额"
                        floatingLabelText="采购金额"
                        onChange={this.buildChangeHandler("purchaseAmount", stringToNumber)}
                        {...convertProp("defaultValue", purchase.purchaseAmount) } />
                </Col>
                <Col xs={6} md={4}>
                    <TextField
                        hintText="付款方式"
                        floatingLabelText="付款方式"
                        onChange={this.buildChangeHandler("paymentMode")}
                        {...convertProp("defaultValue", purchase.paymentMode) } />
                </Col>
                <Col xs={6} md={4}>
                    <DatePicker
                        hintText="付款日期"
                        floatingLabelText="付款日期"
                        DateTimeFormat={dateTimeFormat}
                        autoOk
                        cancelLabel="取消"
                        locale="zh"
                        onChange={this.buildChangeHandler("paymentDate", dateToString)}
                        {...convertProp("defaultDate", stringToDate(purchase.paymentDate)) }
                    />
                </Col>
                <Col xs={6} md={4}>
                    <TextField
                        hintText="付款金额"
                        floatingLabelText="付款金额"
                        onChange={this.buildChangeHandler("paymentAmount", stringToNumber)}
                        {...convertProp("defaultValue", purchase.paymentAmount) } />
                </Col>
                <Col xs={6} md={4}>
                    <DatePicker
                        hintText="回票日期"
                        floatingLabelText="回票日期"
                        DateTimeFormat={dateTimeFormat}
                        autoOk
                        cancelLabel="取消"
                        locale="zh"
                        onChange={this.buildChangeHandler("receiptDate", dateToString)}
                        {...convertProp("defaultValue", stringToDate(purchase.receiptDate)) } />
                </Col>
                <Col xs={6} md={4}>
                    <TextField
                        hintText="回票金额"
                        floatingLabelText="回票金额"
                        onChange={this.buildChangeHandler("receiptAmount", stringToNumber)}
                        {...convertProp("defaultValue", purchase.receiptAmount) } />
                </Col>
                <Col xs={6} md={4}>
                    <TextField
                        hintText="备注（回车换行）"
                        floatingLabelText="备注"
                        multiLine={true}
                        rows={1}
                        onChange={this.buildChangeHandler("remarks")}
                        {...convertProp("defaultValue", purchase.remarks) } />
                </Col>
            </Row>
        );
    }
}