import React from "react";
import { connect } from "react-redux";
import * as actions from "../redux/ExpensesPage/actions";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
  return {
    expensesPage: state.ExpensesReducer
  };
};
const mapDispatchToProps = (dispatch) => ({
  expensesPageActions: bindActionCreators(actions, dispatch)
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
