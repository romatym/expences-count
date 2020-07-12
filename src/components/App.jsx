import React from "react";
import { BrowserRouter } from "react-router-dom";
// import store from "../redux/store";
// import { Container, Row, Col } from "reactstrap";

import { bindActions } from "../hoc/bindActions";

class App extends React.Component {
  componentDidMount() {
    // const { actions } = this.props;
    // actions.fetchCurrencies();
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log("store.getState()", store.getState());
  }

  render() {
    // const { page, total } = this.props.state.reducer;
    const {
      page,
      total,
      date,
      amount,
      currenciesList,
      currency,
      item,
      totalExpences,
    } = this.props.state.reducer;
    this.handleChange = this.props.actions.updateText;
    this.onClick = this.props.actions.submit;
    this.onClickTotal = (event) => {
      this.props.actions.submit(event, { currency, currenciesList });
    };

    const currencyIndex = String(
      1 + currenciesList.findIndex((item) => item === currency)
    );

    const selectCurrencyList = [
      <option defaultValue key="0">
        currency
      </option>,
      currenciesList.map((currency, index) => {
        return (
          <option key={index + 1} value={index + 1}>
            {currency}
          </option>
        );
      }),
    ];

    // const list = total
    //   .sort((elem1, elem2) => {
    //     return Date(elem1.date) - Date(elem2.date);
    //   })
    //   .map((record, index) => {
    //     // <div className="alert alert-light" role="alert" key={index}>
    //     return (
    //       // <p key={index}>
    //       <div className="alert alert-light" role="alert" key={index}>
    //         {"Date: " +
    //           record.date +
    //           " amount: " +
    //           record.amount +
    //           " " +
    //           record.currency +
    //           " Item: " +
    //           record.item}
    //         {/* </p> */}
    //       </div>
    //     );
    //   });

    return (
      <BrowserRouter>
        <div className="container ">
          <div className="form-row action">
            <div className="input-group mb-2">
              <select
                className="custom-select"
                name="operation"
                value={page}
                onChange={this.handleChange}
              >
                <option defaultValue>Choose action...</option>
                <option value="1">Add</option>
                <option value="2">List</option>
                <option value="3">Clear</option>
                <option value="4">Total</option>
              </select>
            </div>
          </div>
          {page === "1" && (
            <div className="form-row">
              <div className="input-group mb-2">
                <input
                  type="date"
                  className="form-control mb-2"
                  name="date"
                  value={date !== "" ? date : new Date().toJSON().substring(0, 10)}
                  placeholder="date"
                  onChange={this.handleChange}
                />
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={amount}
                  placeholder="00.00"
                  onChange={this.handleChange}
                />

                <select
                  className="custom-select select-width"
                  name="currency"
                  value={currencyIndex}
                  onChange={this.handleChange}
                >
                  <option defaultValue>currency</option>
                  <option value="1">USD</option>
                  <option value="2">PLN</option>
                  <option value="3">UAH</option>
                </select>
                <input
                  type="text"
                  className="form-control"
                  name="item"
                  value={item}
                  placeholder="Item"
                  onChange={this.handleChange}
                />
                <button
                  className="btn btn-secondary"
                  name="submitAdd"
                  onClick={this.onClick}
                >
                  Save
                </button>
              </div>
            </div>
          )}
          {page === "2" && (
            <div>
              {
                (total.length === 0
                  ? "No records"
                  : total
                      .sort((elem1, elem2) => {
                        return Date(elem1.date) - Date(elem2.date);
                      })
                      .map((record, index) => {
                        return (
                          <div
                            className="alert alert-light"
                            role="alert"
                            key={index}
                          >
                            {"Date: " +
                              record.date +
                              " amount: " +
                              record.amount +
                              " " +
                              record.currency +
                              " Item: " +
                              record.item}
                          </div>
                        );
                      }))
              }
            </div>
          )}
          {page === "3" && (
            <div className="input-group mb-2 ">
              <input
                type="date"
                className="form-control mb-2 e"
                name="date"
                placeholder="date"
                onChange={this.handleChange}
              />
              <button
                onClick={this.onClick}
                name="submitClear"
                className="btn btn-secondary"
              >
                Clear
              </button>
            </div>
          )}
          {page === "4" && (
            <div className="form-row">
              <div className="input-group mb-2 ">
                <select
                  className="custom-select "
                  name="currency"
                  value={currencyIndex}
                  onChange={this.handleChange}
                >
                  {selectCurrencyList}
                </select>
                <button
                  className="btn btn-secondary"
                  name="submitTotal"
                  onClick={this.onClickTotal}
                >
                  Calculate
                </button>
              </div>
              <div className="alert alert-light" role="alert">
                {totalExpences !== 0 &&
                  "Total expences: " + totalExpences + " " + currency}
              </div>
            </div>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default bindActions(App);
