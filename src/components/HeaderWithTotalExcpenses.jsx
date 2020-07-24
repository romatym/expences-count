import React from "react";
import { withExpenses } from "../hoc/withExpenses";
import currenciesSet from "../redux/currensiesSet";

class HeaderWithTotalExcpenses extends React.Component {
  constructor() {
    super();

    this.initialState = {
      currencyTotal: currenciesSet[0],
      amountTotal: "",
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    this.props.actions.submit("updateCurrenciesRates");
  }

  onChangeCurrencyTotal = (event) => {
    const { name, value } = event.target;

    this.setState(() => ({
      ...this.state,
      [name]: value,
    }));

    //this.props.actions.submit("updateCurrenciesRates");
  };

  selectCurrencyList = () => {
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

  countTotalExpenses = (currencyTotal, currenciesRates, expenses) => {
    if (!expenses.length === 0 || !currencyTotal || !currenciesRates) {
      return 0;
    }

    let baseRate = 0,
      currentRate = 0;

    const amountTotal =
      Math.round(
        expenses.reduce((accumulator, currentElement) => {
          baseRate = currenciesRates[currencyTotal];
          currentRate = currenciesRates[currentElement.currency];
          return (
            accumulator +
            (Number(currentElement.amount) * baseRate) / currentRate
          );
        }, 0) * 100
      ) / 100;

    return amountTotal;
  };

  render() {
    const { currencyTotal } = this.state;
    const { currenciesRates, expenses } = this.props.state.ExpensesReducer;

    const amountTotal = this.countTotalExpenses(
      currencyTotal,
      currenciesRates,
      expenses
    );

    // не получилось вынести функцию selectCurrencyList в отдельный модуль
    const selectCurrencyList = this.selectCurrencyList();

    return (
      <div className="form-row">
        <h5 className="center">
          <div>
            Total in
            <select
              className=" select-width"
              name="currencyTotal"
              value={currencyTotal}
              onChange={this.onChangeCurrencyTotal}
            >
              {selectCurrencyList}
            </select>
          </div>{" "}
          <span className="badge badge-secondary total-width">
            {amountTotal}
          </span>
        </h5>
      </div>
    );
  }
}

export default withExpenses(HeaderWithTotalExcpenses);
