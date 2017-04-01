import React, { Component, PropTypes } from "react";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import IconButton from "material-ui/IconButton";
import ActionDelete from "material-ui/svg-icons/action/delete";
import assign from "lodash/assign";
import {
    compareObjectWithProps,
    convertProp,
    dateToString,
    originally,
    stringToDate,
    stringToNumber
} from "../../common/utils";

const containerStyles = {
    height: "72px",
    fontSize: "16px",
    lineHeight: "24px",
    position: "relative"
};

const opsItemStyles = {
    position: "absolute",
    top: "24px"
};

const opsItemSpanStyles = {
    position: "absolute",
    paddingLeft: "10px",
    top: "14px"
};

export default class PaymentCollection extends Component {
    constructor(props, context) {
        super(props, context);
        this.changeHandlers = {};
        this.state = { payment: {} }
    }

    static defaultProps = {
        onDelete: () => { },
        onChange: () => { }
    }

    static propTypes = {
        onDelete: PropTypes.func,
        onChange: PropTypes.func,
        payment: PropTypes.shape({
            id: PropTypes.number.isRequired,
            amount: PropTypes.number,
            date: PropTypes.string
        }).isRequired,
        dateTimeFormat: PropTypes.func.isRequired
    }

    handleDelete = () => {
        const { onDelete, payment } = this.props;
        onDelete(payment);
    }

    buildChangeHandler = (target, format) => {
        if (!this.changeHandlers[target]) {
            console.log("PaymentCollection", "buildChangeHandler", target);
            const handleChanged = (event/*object*/, newValue/*string or date*/) => {
                console.log("PaymentCollection.buildChangeHandler", target, newValue);
                const { onChange, payment } = this.props;
                onChange(assign({}, payment, { [target]: (format || originally)(newValue) }));
            };

            this.changeHandlers[target] = handleChanged.bind(this);
        }

        return this.changeHandlers[target];
    }

    componentDidMount() {
        this.setState(assign({}, this.state, { payment: this.props.payment }));
    }

    componentWillReceiveProps(nextProps) {
        if (!compareObjectWithProps(nextProps.payment, this.props.payment, ["id", "amount", "date"])) {
            this.setState(assign({}, this.state, { payment: nextProps.payment }));
        }
    }

    render() {
        const { dateTimeFormat } = this.props;
        const { payment } = this.state;
        return (
            <Row>
                <Col xs={2} md={2}>
                    <div className="icon-ops-container" style={containerStyles}>
                        <div className="icon-ops-item" style={opsItemStyles}>
                            <IconButton onClick={this.handleDelete}>
                                <ActionDelete />
                            </IconButton>
                            <span style={opsItemSpanStyles}>#{payment.id}</span>
                        </div>
                    </div>
                </Col>
                <Col xs={5} md={4}>
                    <DatePicker
                        hintText="回款时间"
                        floatingLabelText="回款时间"
                        DateTimeFormat={dateTimeFormat}
                        autoOk
                        cancelLabel="取消"
                        locale="zh"
                        onChange={this.buildChangeHandler("date", dateToString)}
                        {...convertProp("defaultDate", stringToDate(payment.date)) }
                    />
                </Col>
                <Col xs={5} md={4}>
                    <TextField
                        hintText="回款金额"
                        floatingLabelText="回款金额"
                        onChange={this.buildChangeHandler("amount", stringToNumber)}
                        {...convertProp("defaultValue", payment.amount) }
                    />
                </Col>
            </Row>
        );
    }
}