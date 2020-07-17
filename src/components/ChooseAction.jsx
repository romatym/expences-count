import React from "react";
import { bindActions } from "../hoc/bindActions";

class ChooseAction extends React.Component {
  render() {
    const { page } = this.props.state.reducer;
    this.handleChange = this.props.actions.updateText;

    return (
      <div className="form-row action">
        <div className="input-group mb-2">
          <select
            className="custom-select"
            name="operation"
            value={page}
            onChange={this.handleChange}
          >
            <option defaultValue>Choose action...</option>
            <option value="1">Add</option>
            <option value="2">List</option>
            <option value="3">Clear</option>
            <option value="4">Total</option>
          </select>
        </div>
      </div>
    );
  }
}

export default bindActions(ChooseAction);
