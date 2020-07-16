import * as types from "./types.js";
import currenciesSet from "./currensiesSet.js";

const initialState = {
  total: [],
  errors: {},
  page: "0",
  item: "",
  date: String(new Date().toJSON().substring(0, 10)), //"", //new Date(),
  currency: "",
  amount: "",
  currenciesList: currenciesSet,
  currencyRate: 0,
  totalExpences: 0,
};

const CheckErrors = (state, action) => {
  const errors = {};

  switch (action.type) {
    case types.SUBMIT_ADD:
      if (!state.date) {
        errors.date = "Required";
      }
      if (!state.amount) {
        errors.amount = "Required";
      }
      if (!state.currency) {
        errors.currency = "Required";
      }
      if (!state.item) {
        errors.item = "Required";
      }
      break;

    case types.SUBMIT_CLEAR:
      if (!state.date) {
        errors.date = "Required";
      }
      break;

    case types.SUBMIT_TOTAL:
      if (!state.currency) {
        errors.currency = "Required";
      }
      break;

    default:
  }

  return errors;
};

const reducer = (state = initialState, action) => {
  const { date, amount, currency, item } = state;

  console.log("types", types);

  if (action.type === types.UPDATE_TEXT) {
    return {
      ...state,
      [action.payload.name]: action.payload.text,
    };
  }
  if (action.type === types.SHOW_PAGE) {
    return {
      ...state,
      errors: {},
      page: action.payload.page,
    };
  }

  const errors = CheckErrors(state, action);
  if (Object.keys(errors).length > 0) {
    return {
      ...state,
      errors,
    };
  }

  switch (action.type) {
    case types.SUBMIT_ADD:
      return {
        ...state,
        total: [
          ...state.total,
          {
            date,
            amount,
            currency,
            item,
          },
        ],
        date: "",
        amount: "",
        currency: "",
        item: "",
      };
    case types.SUBMIT_CLEAR:
      return {
        ...state,
        total: state.total.filter((elem) => {
          return elem.date !== date;
        }),
        page: "0",
      };
    case types.SUBMIT_TOTAL:
      const { baseCurrency, currenciesRates } = action.payload;
      let baseRate = 0,
        currentRate = 0;
      const totalExpences =
        Math.round(
          state.total.reduce((accumulator, currentElement) => {
            baseRate = currenciesRates[baseCurrency];
            currentRate = currenciesRates[currentElement.currency];
            return (
              accumulator +
              (Number(currentElement.amount) * baseRate) / currentRate
            );
          }, 0) * 100
        ) / 100;

      return {
        ...state,
        totalExpences,
      };

    // case types.SHOW_PAGE:
    //   return {
    //     ...state,
    //     page: action.payload.page,
    //   };

    default:
      return state;
  }
};

export default reducer;
