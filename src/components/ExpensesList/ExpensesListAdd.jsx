import React from "react";
import { withExpenses } from "../../hoc/withExpenses";
import currenciesSet from "../../redux/ExpensesPage/currensiesSet";

class ExpensesListAdd extends React.Component {
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

    this.props.expensesPageActions.expensesAdd(this.state);
    this.setState(() => this.initialState);
  };

  onDelete = (event) => {
    this.props.expensesPageActions.expensesDelete(event.target.value);
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
          <div className="invalid-feedback">{errors.date}</div>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            name="item"
            value={item}
            placeholder="Item"
            onChange={this.onChange}
            required
          />
          <div className="invalid-feedback">{errors.item}</div>
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
          <div className="invalid-feedback">{errors.amount}</div>
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
          <div className="invalid-feedback">{errors.currency}</div>
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
    );
  }
}

export default withExpenses(ExpensesListAdd);
