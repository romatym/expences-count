import React from "react";
import { bindActions } from "../hoc/bindActions";

class AddAction extends React.Component {
  render() {
    const {
      date,
      amount,
      currenciesList,
      currency,
      item,
      errors
    } = this.props.state.reducer;
    this.handleChange = this.props.actions.updateText;
    this.onClick = this.props.actions.submit;

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
        <div className="input-group mb-2">
          <input
            type="date"
            className="form-control mb-2"
            name="date"
            value={date} // !== "" ? date : new Date().toJSON().substring(0, 10)}
            placeholder="date"
            onChange={this.handleChange}
          />
          {/* {error ? <div className="invalid-feedback">{error}</div> : null} */}

          <input
            type="number"
            className="form-control"
            name="amount"
            value={amount}
            placeholder="00.00"
            onChange={this.handleChange}
          />

          <select
            className="custom-select select-width"
            name="currency"
            value={currencyIndex}
            onChange={this.handleChange}
          >
            {selectCurrencyList}
          </select>

          <input
            type="text"
            className="form-control"
            name="item"
            value={item}
            placeholder="Item"
            onChange={this.handleChange}
          />

          <button
            className="btn btn-secondary"
            name="submitAdd"
            onClick={this.onClick}
          >
            Save
          </button>
        </div>
        {/* {Object.keys(errors).length !== 0 ? <div className="invalid-feedback">{"Fields required: " + Object.keys(errors).join(", ")}</div> : null} */}
      </div>
    );
  }
}

export default bindActions(AddAction);
