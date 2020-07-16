import React from "react";
import { bindActions } from "../hoc/bindActions";

class ListAction extends React.Component {
  render() {
    const { total } = this.props.state.reducer;
    this.handleChange = this.props.actions.updateText;
    this.onClick = this.props.actions.submit;

    return (
      <div>
        {total.length === 0
          ? "No records"
          : total
              .sort((elem1, elem2) => {
                return Date(elem1.date) - Date(elem2.date);
              })
              .map((record, index) => {
                return (
                  <div className="alert alert-light" role="alert" key={index}>
                    {"Date: " +
                      record.date +
                      " amount: " +
                      record.amount +
                      " " +
                      record.currency +
                      " Item: " +
                      record.item}
                  </div>
                );
              })}
      </div>
    );
  }
}

export default bindActions(ListAction);
