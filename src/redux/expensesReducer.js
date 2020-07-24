import * as types from "./types.js";

const initialState = {
  expenses: [],
  currenciesRates: {},
};

const ExpensesReducer = (state = initialState, action) => {
  if (!action.payload) {
    return state;
  }

  switch (action.type) {
    case types.SUBMIT_ADD:
      const { date, amount, currency, item } = action.payload;
      return {
        ...state,
        expenses: [
          ...state.expenses,
          {
            date,
            amount,
            currency,
            item,
          },
        ],
      };

    case types.UPDATE_CURRENCIES_RATES:
      const { currenciesRates } = action.payload;
      return {
        ...state,
        currenciesRates
      };

    case types.SUBMIT_DELETE:
      return {
        ...state,
        expenses: state.expenses.filter((elem, index) => {
          return index + 1 !== Number(action.payload);
        }),
      };

    default:
      return state;
  }
};

export default ExpensesReducer;
