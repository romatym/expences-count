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
