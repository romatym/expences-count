import React from "react";
import ExpensesList from "./ExpensesList/ExpensesList";
import TotalExpenses from "./ExpensesList/TotalExpenses";

class App extends React.Component {
  
  render() {

    return (
      <div className="container ">
        <TotalExpenses/>
        <ExpensesList/>
      </div>
    );
  }
}

export default App;
