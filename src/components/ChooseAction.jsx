import React from "react";
import { withExpenses } from "../hoc/withExpenses";

class ChooseAction extends React.Component {
  state = {
    page: 1,
  };

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState(() => ({
      ...this.state,
      [name]: value
    }))
  };

  render() {
    const { page } = this.props.state.ExpensesReducer;
    this.handleChange = this.props.actions.updateText;

    return (
      <div className="form-row action">
        <div className="input-group mb-2">
          <select
            className="custom-select"
            name="page"
            value={page}
            onChange={this.onChange}
          >
            {/* <option defaultValue>Choose action...</option> */}
            <option defaultValue value="1">
              Add
            </option>
            <option value="2">List</option>
            <option value="3">Clear</option>
            <option value="4">Total</option>
          </select>
        </div>
      </div>
    );
  }
}

export default withExpenses(ChooseAction);
