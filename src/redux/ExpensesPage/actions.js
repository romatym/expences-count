import CallApi from "../../api/api";
import currenciesSet from "./currensiesSet";

export const expensesAdd = (payload) => {
  return {
    type: "EXPENSES_ADD",
    payload,
  };
};

export const expensesDelete = (payload) => {
  return {
    type: "EXPENSES_DELETE",
    payload,
  };
};

export const expensesFetchCurrencies = () => async (dispatch) => {
  dispatch({
    type: "REQUEST_CURRENCIES_RATES",
  });

  const response = await CallApi.get("", {
    params: {
      symbols: currenciesSet.join(","),
    },
  });
  if (response.success) {
    dispatch({
      type: "UPDATE_CURRENCIES_RATES",
      payload: {
        currenciesRates: response.rates,
      },
    });
  } else {
    dispatch({
      type: "ERROR_CURRENCIES_RATES",
      payload: {
        errors: response,
      },
    });
  }
};
