import React from "react";
import currenciesSet from "../../redux/ExpensesPage/currensiesSet";

const selectCurrencyList = () => {
    return [
      currenciesSet.map((currency, index) => {
        return (
          <option key={index} value={currency}>
            {currency}
          </option>
        );
      }),
    ];
  };

export default selectCurrencyList;