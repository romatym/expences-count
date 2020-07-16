import CallApi from "../api/api";

export const updateText = (event) => {
  const { value: text, name } = event.target;

  switch (name) {
    case "operation":
      return {
        type: "SHOW_PAGE",
        payload: {
          page: event.target.value,
        },
      };
    case "currency":
      return {
        type: "UPDATE_TEXT",
        payload: {
          name,
          text: event.target.options[event.target.value].text,
        },
      };
    default:
      return {
        type: "UPDATE_TEXT",
        payload: {
          name,
          text,
        },
      };
  }
};

export const submit = (event, ...params) => {
  const { name } = event.target;

  switch (name) {
    case "submitAdd":
      return {
        type: "SUBMIT_ADD",
      };
    case "submitClear":
      return {
        type: "SUBMIT_CLEAR",
      };
    case "submitTotal":
      return fetchCurrencies(params[0]);
    default:
      return {
        type: "SHOW_PAGE",
        payload: {
          page: "0",
        },
      };
  }
};

export const fetchCurrencies = (currenciesParams) => (dispatch) => {
  const { currency, currenciesList } = currenciesParams;
  dispatch({
    type: "UPDATE_CURRENCY_RATE",
  });

  CallApi.get("", {
    params: {
      symbols: currenciesList.join(","),
    },
  }).then((data) => {

    dispatch({
      type: "SUBMIT_TOTAL",
      payload: {
        baseCurrency: currency,
        currenciesRates: data.rates,
      },
    });
  });
};
