import React from "react";
import { withExpenses } from "../../hoc/withExpenses";
import currenciesSet from "../../redux/ExpensesPage/currensiesSet";

class TotalExpenses extends React.Component {
  constructor() {
    super();

    this.initialState = {
      currencyTotal: currenciesSet[0],
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    this.props.expensesPageActions.expensesFetchCurrencies();
  }

  onChangeCurrencyTotal = (event) => {
    this.setState({
      currencyTotal: event.target.value,
    });
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

    const total = expenses.reduce((acc, expense) => {
      const baseRate = currenciesRates[currencyTotal];
      const currentRate = currenciesRates[expense.currency];
      return acc + (Number(expense.amount) * baseRate) / currentRate;
    }, 0);

    const amountTotal = Math.round(total * 100) / 100;

    return amountTotal;
  };

  render() {
    const { currencyTotal } = this.state;
    const { currenciesRates, expenses } = this.props.expensesPage;

    const amountTotal = this.countTotalExpenses(
      currencyTotal,
      currenciesRates,
      expenses
    );

    // не получилось вынести функцию selectCurrencyList в отдельный модуль
    const selectCurrencyList = this.selectCurrencyList();

    console.log("selectCurrencyList", selectCurrencyList);

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

export default withExpenses(TotalExpenses);
