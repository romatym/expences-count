import CallApi from "../api/api";
import currenciesSet from "../redux/currensiesSet";

export const submit = (action, payload) => {
  switch (action) {
    case "submitAdd":
      return {
        type: "SUBMIT_ADD",
        payload,
      };
    case "submitDelete":
      return {
        type: "SUBMIT_DELETE",
        payload,
      };
    case "updateCurrenciesRates":
      return fetchCurrencies();
    default:
      return {
        type: "TEST"
      };
  }
};

export const fetchCurrencies = () => (dispatch) => {
  CallApi.get("", {
    params: {
      symbols: currenciesSet.join(","),
    },
  })
    .then((data) => {
      if (data.success) {
        dispatch({
          type: "UPDATE_CURRENCIES_RATES",
          payload: {
            currenciesRates: data.rates,
          },
        });
      } else {
        dispatch({
          type: "UPDATE_CURRENCIES_RATES",
          payload: {
            errors: data.error,
          },
        });
      }
    })
    .catch((response) => {
      dispatch({
        type: "UPDATE_CURRENCIES_RATES",
        payload: {
          errors: response,
        },
      });
    });
};
