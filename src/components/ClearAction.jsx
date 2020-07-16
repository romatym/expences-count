import React from "react";
import { bindActions } from "../hoc/bindActions";

class ClearAction extends React.Component {
  render() {
    const { date } = this.props.state.reducer;
    this.handleChange = this.props.actions.updateText;
    this.onClick = this.props.actions.submit;

    return (
      <div className="input-group mb-2 ">
        <input
          type="date"
          className="form-control mb-2 e"
          name="date"
          value={date}
          placeholder="date"
          onChange={this.handleChange}
        />
        <button
          onClick={this.onClick}
          name="submitClear"
          className="btn btn-secondary"
        >
          Clear
        </button>
      </div>
    );
  }
}

export default bindActions(ClearAction);
