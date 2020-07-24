import React from "react";
import { withExpenses } from "../hoc/withExpenses";
import currenciesSet from "../redux/currensiesSet";

class AddAction extends React.Component {
  constructor() {
    super();

    this.initialState = {
      item: "",
      date: this.todayDate(),
      currency: "",
      amount: "",
      errors: {},
    };
    this.state = this.initialState;
  }

  todayDate = () => {
    return String(new Date().toJSON().substring(0, 10));
  };

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState(() => ({
      [name]: value,
    }));
  };

  onSubmit = () => {
    const errors = this.validateFields();
    this.setState(() => ({
      ...this.state,
      errors,
    }));

    if (Object.keys(errors).length > 0) {
      return;
    }

    this.props.actions.submit("submitAdd", this.state);
    this.setState(() => this.initialState);
  };

  validateFields = () => {
    const errors = {};

    if (this.state.date === "") {
      errors.date = "Required";
    }
    if (this.state.amount === "") {
      errors.amount = "Required";
    }
    if (this.state.currency === "") {
      errors.currency = "Required";
    }
    if (this.state.item === "") {
      errors.item = "Required";
    }

    return errors;
  };
  errorsText = () => {
    return Object.entries(this.state.errors)
      .map(([key, value]) => {
        return String(key + ": " + value);
      })
      .join(", ");
  };
  render() {
    const { date, amount, currency, item, errors } = this.state;

    const selectCurrencyList = [
      <option defaultValue key="0">
        currency
      </option>,
      currenciesSet.map((currency, index) => {
        return (
          <option key={index} value={currency}>
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
            className="form-control mb-2  "
            name="date"
            value={date}
            placeholder="date"
            onChange={this.onChange}
          />

          <input
            type="text"
            className="form-control  "
            name="item"
            value={item}
            placeholder="Item"
            onChange={this.onChange}
          />

          <input
            type="number"
            className="form-control  "
            name="amount"
            value={amount}
            placeholder="00.00"
            onChange={this.onChange}
          />

          <select
            className="custom-select  "
            name="currency"
            value={currency}
            onChange={this.onChange}
          >
            {selectCurrencyList}
          </select>

          <button
            className="btn btn-secondary"
            name="submitAdd"
            onClick={this.onSubmit}
          >
            Save
          </button>
        </div>
        {Object.keys(errors).length !== 0 && (
          <div className="invalid-feedback">{this.errorsText()}</div>
        )}
      </div>
    );
  }
}

export default withExpenses(AddAction);
