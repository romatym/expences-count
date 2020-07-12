import * as types from "./types";
//import { cookies } from "../components/utils/cookies";

const initialState = {
  total: [],
  page: "0",
  item: "",
  date: "", //new Date(),
  currency: "",
  amount: "",
  currenciesList: ["USD", "PLN", "UAH"],
  currencyRate: 0,
  totalExpences: 0
};

const reducer = (state = initialState, action) => {
  const { date, amount, currency, item } = state;

  const totalClear = state.total.filter((elem) => {
    return elem.date !== date;
  });

  switch (action.type) {
    case types.UPDATE_TEXT:
      return {
        ...state,
        [action.payload.name]: action.payload.text,
      };
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
        total: totalClear,
        page: "0",
      };
    case types.SUBMIT_TOTAL:
      const {baseCurrency, currenciesRates} = action.payload;
      let baseRate = 0, currentRate = 0;
      const totalExpences = Math.round(state.total.reduce((accumulator, currentElement) => {
        baseRate = currenciesRates[baseCurrency];
        currentRate = currenciesRates[currentElement.currency];
        return accumulator + Number(currentElement.amount) * baseRate / currentRate;
      }, 0) * 100) / 100;

      return {
        ...state,
        totalExpences
      };

    case types.SHOW_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };

    default:
      return state;
  }
};

export default reducer;
