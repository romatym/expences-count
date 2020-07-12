import React from "react";
// import { AppContext } from "../App";
import { connect } from "react-redux";
// import * as authActions from "../redux/auth/auth.actions";
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

export const bindActions = (Component) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class bindActions extends React.Component {
      render() {
        return <Component {...this.props} />;
      }
    }
  );
