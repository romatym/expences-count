import React from "react";
import { withExpenses } from "../hoc/withExpenses";

class ClearAction extends React.Component {
  constructor() {
    super();

    this.initialState = {
      date: "",
      errors: {}
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

    this.props.actions.submit("submitClear", this.state);
    this.setState(() => this.initialState);
  };

  validateFields = () => {
    const errors = {};

    if (this.state.date === "") {
      errors.date = "Required";
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
    const { date } = this.state;
    const { Expenses } = this.props.state.ExpensesReducer;
    if (Expenses.length === 0) {
      return <div className="input-group mb-2 center">No Expenses</div>;
    }

    return (
      <div className="input-group mb-2 ">
        <input
          type="date"
          className="form-control mb-2 e"
          name="date"
          value={date}
          placeholder="date"
          onChange={this.onChange}
        />
        <button
          onClick={this.onSubmit}
          name="submitClear"
          className="btn btn-secondary"
        >
          Clear
        </button>
      </div>
    );
  }
}

export default withExpenses(ClearAction);
