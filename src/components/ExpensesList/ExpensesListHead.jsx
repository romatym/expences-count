import React from "react";
import { withExpenses } from "../../hoc/withExpenses";
import ExpensesListHeader from "./ExpensesListHeader";
import ExpensesListAdd from "./ExpensesListAdd";

class ExpensesListHead extends React.Component {
  
  render() {
    
    return (
      <thead>
        <ExpensesListHeader />
        <ExpensesListAdd />
      </thead>
    );
  }
}

export default withExpenses(ExpensesListHead);
