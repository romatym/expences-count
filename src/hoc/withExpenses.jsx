import React from "react";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
  return {
    //actions: state.actions
    state
  };
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export const withExpenses = (Component) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class withExpenses extends React.Component {
      render() {
        return <Component {...this.props} />;
      }
    }
  );
