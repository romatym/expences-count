import React from "react";

class ExpensesListHeader extends React.Component {
  render() {
    return (
      <tr>
        <th scope="col" className="width5">
          №
        </th>
        <th scope="col" className="width10">
          Date
        </th>
        <th scope="col">Item</th>
        <th scope="col" className="width15">
          Amount
        </th>
        <th scope="col" className="width10">
          Сurrency
        </th>
      </tr>
    );
  }
}

export default ExpensesListHeader;
