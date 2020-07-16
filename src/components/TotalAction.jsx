import React from "react";
import { bindActions } from "../hoc/bindActions";

class TotalAction extends React.Component {
  render() {
    const {
      currenciesList,
      currency,
      totalExpences,
    } = this.props.state.reducer;
    this.handleChange = this.props.actions.updateText;
    //this.onClick = this.props.actions.submit;
    this.onClick = (event) => {
      this.props.actions.submit(event, { currency, currenciesList });
    };
    const currencyIndex = String(
      1 + currenciesList.findIndex((item) => item === currency)
    );

    const selectCurrencyList = [
      <option defaultValue key="0">
        currency
      </option>,
      currenciesList.map((currency, index) => {
        return (
          <option key={index + 1} value={index + 1}>
            {currency}
          </option>
        );
      }),
    ];

    return (
      <div className="form-row">
        <div className="input-group mb-2 ">
          <select
            className="custom-select "
            name="currency"
            value={currencyIndex}
            onChange={this.handleChange}
          >
            {selectCurrencyList}
          </select>
          <button
            className="btn btn-secondary"
            name="submitTotal"
            onClick={this.onClick}
          >
            Calculate
          </button>
        </div>
        <div className="alert alert-light" role="alert">
          {totalExpences !== 0 &&
            "Total expences: " + totalExpences + " " + currency}
        </div>
      </div>
    );
  }
}

export default bindActions(TotalAction);
