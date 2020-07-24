import React from "react";
import { withExpenses } from "../hoc/withExpenses";

class ExpensesListBody extends React.Component {
  onDelete = (event) => {
    this.props.actions.submit("submitDelete", event.target.value);
  };

  render() {
    const { expenses } = this.props.state.ExpensesReducer;

    return (
      <tbody>
        {expenses
          .sort((elem1, elem2) => {
            return Date(elem1.date) - Date(elem2.date);
          })
          .map((record, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.date}</td>
                <td className="align-right">{record.item}</td>
                <td className="align-right">{record.amount}</td>
                <td>{record.currency}</td>
                <td className="width5">
                  <button
                    className="btn btn-secondary"
                    name="submitDelete"
                    value={index + 1}
                    onClick={this.onDelete}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    );
  }
}

export default withExpenses(ExpensesListBody);
