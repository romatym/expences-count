import React from "react";
import { withExpenses } from "../hoc/withExpenses";
import currenciesSet from "../redux/currensiesSet";

class ExpensesListHead extends React.Component {
  constructor() {
    super();

    this.initialState = {
      currencyTotal: "",
      amountTotal: "",
      item: "",
      date: this.todayDate(),
      currency: currenciesSet[0],
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

  onAdd = () => {
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

  onDelete = (event) => {
    this.props.actions.submit("submitDelete", event.target.value);
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

  render() {
    const { date, amount, currency, item, errors } = this.state;

    const selectCurrencyList = [
      currenciesSet.map((currency, index) => {
        return (
          <option key={index} value={currency}>
            {currency}
          </option>
        );
      }),
    ];

    return (
      <thead>
        <tr>
          <th scope="col" className="width5">
            №
          </th>
          <th scope="col" className="width10">
            Date
          </th>
          <th scope="col">Item</th>
          <th scope="col" className="width15">
            Amount
          </th>
          <th scope="col" className="width10">
            Сurrency
          </th>
        </tr>

        <tr>
          <td className="width5"></td>
          <td className="width10">
            <input
              type="date"
              className="form-control mb-2 "
              name="date"
              value={date}
              placeholder="date"
              onChange={this.onChange}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              name="item"
              value={item}
              placeholder="Item"
              onChange={this.onChange}
            />
          </td>
          <td className="width15">
            <input
              type="number"
              className="form-control  "
              name="amount"
              value={amount}
              placeholder="00.00"
              onChange={this.onChange}
            />
          </td>
          <td className="width10">
            <select
              className="custom-select  "
              name="currency"
              value={currency}
              onChange={this.onChange}
            >
              {selectCurrencyList}
            </select>
          </td>

          <td className="border-top-none">
            <button
              className="btn btn-secondary"
              name="submitAdd"
              onClick={this.onAdd}
            >
              Add
            </button>
          </td>
        </tr>
        {Object.keys(errors).length !== 0 && (
          <tr>
            <th scope="col" className="error width5"></th>
            <th scope="col" className="error width10">
              {errors.date}
            </th>
            <th scope="col" className="error">
              {errors.item}
            </th>
            <th scope="col" className="error width15">
              {errors.amount}
            </th>
            <th scope="col" className="error width10">
              {errors.currency}
            </th>
          </tr>
        )}
      </thead>
    );
  }
}

export default withExpenses(ExpensesListHead);
