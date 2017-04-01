import React, { Component } from 'react';
import areIntlLocalesSupported from 'intl-locales-supported';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import assign from 'lodash/assign';
import PaymentCollection from "./PaymentCollection";
import Procurement from "./Procurement";
import Sale from "./Sale";
import {
  convertProp,
  arrToString,
  stringToArr,
  originally
} from "../../common/utils";

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(["zh"])) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and replace the constructors we need with the polyfill's.
    const IntlPolyfill = require("intl");
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require("intl/locale-data/jsonp/zh");
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require("intl");
}

const styles = {
  button: {
    marginRight: 24,
  }
};

export default class Create extends Component {
  constructor(props, context) {
    super(props, context);
    this.changeHandlers = {};
    this.planIndex = 0;
    this.actualIndex = 0;
    this.procurementIndex = 0;
  }

  state = {
    logistics: [], //内勤人员
    principals: [], //负责人
    contractId: "", //合同编号
    sale: {},
    planPaymentCollection: [],
    actualPaymentCollection: [],
    procurements: []
  };

  handleNewPlanPaymentCollection = () => {
    const { planPaymentCollection } = this.state;
    this.updateState({
      planPaymentCollection: planPaymentCollection.concat([{
        id: ++this.planIndex
      }])
    });
  }

  handleDelPlanPaymentCollection = (payment) => {
    const id = payment.id;
    const oldPlans = this.state.planPaymentCollection;
    this.updateState({
      planPaymentCollection: oldPlans.reduce((plans, plan) => {
        if (plan.id !== id) {
          plans.push(plan);
        }

        return plans;
      }, [])
    });
  }

  handleNewActualPaymentCollection = () => {
    const { actualPaymentCollection } = this.state;
    this.updateState({
      actualPaymentCollection: actualPaymentCollection.concat([{
        id: ++this.actualIndex
      }])
    });
  }

  handleDelActualPaymentCollection = (payment) => {
    const id = payment.id;
    const oldActuals = this.state.actualPaymentCollection;
    this.updateState({
      actualPaymentCollection: oldActuals.reduce((actuals, actual) => {
        if (actual.id !== id) {
          actuals.push(actual);
        }

        return actuals;
      }, [])
    });
  }

  handleNewProcurement = () => {
    const { procurements } = this.state;
    this.updateState({
      procurements: procurements.concat([{ id: ++this.procurementIndex }])
    });
  }

  handlePlanPaymentCollectionChanged = (plan) => {
    const plans = this.state.planPaymentCollection;
    this.updateState({
      planPaymentCollection: plans.reduce((items, item) => {
        if (plan.id === item.id) {
          items.push(plan);
        } else {
          items.push(item);
        }
        return items;
      }, [])
    });
  }

  handleActualPaymentCollectionChanged = (actual) => {
    const actuals = this.state.actualPaymentCollection;
    this.updateState({
      actualPaymentCollection: actuals.reduce((items, item) => {
        if (actual.id === item.id) {
          items.push(actual);
        } else {
          items.push(item);
        }
        return items;
      }, [])
    });
  }

  handleProcurementChanged = (procurement) => {
    const { procurements } = this.state;
    this.updateState({
      procurements: procurements.reduce((items, item) => {
        if (procurement.id === item.id) {
          items.push(procurement);
        } else {
          items.push(item);
        }
        return items;
      }, [])
    });
  }

  handleSaleChanged = (sale) => {
    this.updateState({ sale });
  }

  buildChangeHandler = (target, format) => {
    if (!this.changeHandlers[target]) {
      console.log("Create", "buildChangeHandler", target);
      const handleChanged = (event/*object*/, newValue/*string or date*/) => {

        console.log("Create.buildChangeHandler", target, newValue);
        this.updateState({ [target]: (format || originally)(newValue) });
      };

      this.changeHandlers[target] = handleChanged.bind(this);
    }

    return this.changeHandlers[target];
  }

  handleSave = () => {

  }

  handleReset = () => {
    this.setState({
      logistics: [],
      principals: [],
      contractId: "",
      sale: {
        client: "",
        projectName: "",
        projectAmount: "",
        qualityAmount: "",
        qualityDate: "",
        qualityYears: "",
        serviceAmount: "",
        billingAmount: "",
        billingDate: ""
      },
      planPaymentCollection: [],
      actualPaymentCollection: [],
      procurements: []
    })
  }

  updateState = (state) => {
    this.setState(assign({}, this.state, state));
  }

  render() {
    const DateTimeFormat = Intl.DateTimeFormat;
    const {
      logistics,
      principals,
      contractId,
      sale,
      planPaymentCollection,
      actualPaymentCollection,
      procurements } = this.state;
    return (
      <div className="craete-panel">
        <h1>创建项目</h1>
        <Grid>
          <h2 className="info-group-header">项目基本信息</h2>
          <Row>
            <Col xs={6} md={4}>
              <TextField
                hintText="内勤人员（; 分隔多人）"
                floatingLabelText="内勤人员"
                onChange={this.buildChangeHandler("logistics", stringToArr)}
                {...convertProp("value", arrToString(logistics)) } />
            </Col>
            <Col xs={6} md={4}>
              <TextField
                hintText="负责人（; 分隔多人）"
                floatingLabelText="负责人"
                onChange={this.buildChangeHandler("principals", stringToArr)}
                {...convertProp("value", arrToString(principals)) } />
            </Col>
            <Col xs={6} md={4}>
              <TextField
                hintText="输入唯一合同编号"
                floatingLabelText="合同编号"
                onChange={this.buildChangeHandler("contractId")}
                {...convertProp("value", contractId) } />
            </Col>
          </Row>
          <h2 className="info-group-header">项目销售信息</h2>
          <Sale sale={sale} dateTimeFormat={DateTimeFormat} onChange={this.handleSaleChanged} />

          {planPaymentCollection.length > 0 && (
            <h3 className="info-sub-group-header">计划回款</h3>
          )}
          {planPaymentCollection.map((plan, index) => {
            return (<PaymentCollection key={`plan-${index}`}
              payment={plan}
              dateTimeFormat={DateTimeFormat}
              onDelete={this.handleDelPlanPaymentCollection}
              onChange={this.handlePlanPaymentCollectionChanged} />)
          })}
          {actualPaymentCollection.length > 0 && (
            <h3 className="info-sub-group-header">实际回款</h3>
          )}
          {actualPaymentCollection.map((actual, index) => {
            return (<PaymentCollection key={`actual-${index}`}
              payment={actual}
              dateTimeFormat={DateTimeFormat}
              onDelete={this.handleDelActualPaymentCollection}
              onChange={this.handleActualPaymentCollectionChanged} />)
          })}
          {procurements.map((procurement, index) => {
            return (<div key={`procurement-${index}`}>
              <h2 className="info-group-header">#{index + 1} 项目采购信息</h2>
              <Procurement
                purchase={procurement}
                dateTimeFormat={DateTimeFormat}
                onChange={this.handleProcurementChanged} />
            </div>)
          })}

          <Row>
            <Col xs={12} md={12}>
              <div className="additional-actions">
                <RaisedButton
                  label="增加计划回款"
                  secondary={true}
                  style={styles.button}
                  onClick={this.handleNewPlanPaymentCollection}
                  icon={<ContentAdd />}
                />
                <RaisedButton
                  label="增加实际回款"
                  secondary={true}
                  style={styles.button}
                  onClick={this.handleNewActualPaymentCollection}
                  icon={<ContentAdd />}
                />
                <RaisedButton
                  label="增加采购"
                  secondary={true}
                  style={styles.button}
                  onClick={this.handleNewProcurement}
                  icon={<ContentAdd />}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <RaisedButton primary={true} fullWidth={true} onClick={this.handleSave}>保存</RaisedButton>
            </Col>
            <Col xs={12} md={6}>
              <FlatButton onClick={this.handleReset}>重置</FlatButton>
            </Col>
          </Row>
        </Grid >
      </div>
    );
  }
}
