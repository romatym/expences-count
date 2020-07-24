import React from "react";
import { withExpenses } from "../hoc/withExpenses";
import ExpensesListHead from "./ExpensesListHead";
import ExpensesListBody from "./ExpensesListBody";

class ExpensesList extends React.Component {
  render() {
    return (
      <table className="table table-striped table-margin">
        <ExpensesListHead />
        <ExpensesListBody />
      </table>
    );
  }
}

export default withExpenses(ExpensesList);
