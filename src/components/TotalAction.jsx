import React from "react";
import { withExpenses } from "../hoc/withExpenses";
import currenciesSet from "../redux/currensiesSet";

class TotalAction extends React.Component {
  constructor() {
    super();

    this.initialState = {
      currency: "",
      errors: {},
    };
    this.state = this.initialState;
  }

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

    this.props.actions.submit("submitTotal", this.state);
    //this.setState(() => this.initialState);
  };

  validateFields = () => {
    const errors = {};

    if (this.state.currency === "") {
      errors.currency = "Required";
    }
    
    return errors;
  };

  render() {
    const { Expenses, totalExpenses } = this.props.state.ExpensesReducer;
    const { currency } = this.state;

    if (Expenses.length === 0) {
      return <div className="input-group mb-2 center">No Expenses</div>;
    }

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
        <div className="input-group mb-2 ">
          <select
            className="custom-select "
            name="currency"
            value={currency}
            onChange={this.onChange}
          >
            {selectCurrencyList}
          </select>
          <button
            className="btn btn-secondary"
            name="submitTotal"
            onClick={this.onSubmit}
          >
            Calculate
          </button>
        </div>
        <div className="input-group mb-2 center">
          {totalExpenses !== 0 &&
            "Total Expenses: " + totalExpenses + " " + currency}
        </div>
      </div>
    );
  }
}

export default withExpenses(TotalAction);
