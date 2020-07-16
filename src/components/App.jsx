import React from "react";
import { BrowserRouter } from "react-router-dom";
import AddAction from "./AddAction";
import ListAction from "./ListAction";
import ClearAction from "./ClearAction";
import TotalAction from "./TotalAction";
import ChooseAction from "./ChooseAction";

import { bindActions } from "../hoc/bindActions";

class App extends React.Component {
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { page, errors } = this.props.state.reducer;
    // const { page, currenciesList, currency } = this.props.state.reducer;
    // this.handleChange = this.props.actions.updateText;
    // this.onClick = this.props.actions.submit;
    // this.onClickTotal = (event) => {
    //   this.props.actions.submit(event, { currency, currenciesList });
    // };

    // const currencyIndex = String(
    //   1 + currenciesList.findIndex((item) => item === currency)
    // );

    // const selectCurrencyList = [
    //   <option defaultValue key="0">
    //     currency
    //   </option>,
    //   currenciesList.map((currency, index) => {
    //     return (
    //       <option key={index + 1} value={index + 1}>
    //         {currency}
    //       </option>
    //     );
    //   }),
    // ];

    return (
      <BrowserRouter>
        <div className="container ">
          <ChooseAction />
          {page === "1" && <AddAction />}
          {page === "2" && <ListAction />}
          {page === "3" && <ClearAction />}
          {page === "4" && <TotalAction />}
          {Object.keys(errors).length !== 0 ? <div className="invalid-feedback">{"Fields required: " + Object.keys(errors).join(", ")}</div> : null}
        </div>
      </BrowserRouter>
    );
  }
}

export default bindActions(App);
