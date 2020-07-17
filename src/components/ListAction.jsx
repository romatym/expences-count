import React from "react";
import { bindActions } from "../hoc/bindActions";

class ListAction extends React.Component {
  render() {
    const { total } = this.props.state.reducer;
    if (total.length === 0) {
      return <div className="input-group mb-2 center">No expences</div>;
    }
    this.handleChange = this.props.actions.updateText;
    this.onClick = this.props.actions.submit;

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Amount and currency</th>
            <th scope="col">Item</th>
          </tr>
        </thead>
        <tbody>
          {total
            .sort((elem1, elem2) => {
              return Date(elem1.date) - Date(elem2.date);
            })
            .map((record, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{record.date}</td>
                  <td>
                    {record.amount} {record.currency}
                  </td>
                  <td>{record.item}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

export default bindActions(ListAction);
