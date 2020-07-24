import React from "react";
import ExpensesList from "./ExpensesList";
import HeaderWithTotalExcpenses from "./HeaderWithTotalExcpenses";

import { withExpenses } from "../hoc/withExpenses";

class App extends React.Component {
  
  render() {

    return (
      <div className="container ">
        <HeaderWithTotalExcpenses/>
        <ExpensesList/>
      </div>
    );
  }
}

export default withExpenses(App);
