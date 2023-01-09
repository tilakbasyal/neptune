import { Dispatch, ReducerAction } from "react";
import { ActionType, CurrencyType } from "./form.types";

export const handleInputChange =
  (type: string) =>
  (dispatch: Dispatch<ReducerAction<() => void>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch({
      type,
      inputValue: parseInt(value),
    });
  };

export const reducer = (state: CurrencyType, action: ActionType) => {
  switch (action.type) {
    case CurrencyType.NEP:
      return {
        nep: action.inputValue,
        busd: action.inputValue * 3,
        error: action.inputValue < 0 && "nepError",
      };
    case CurrencyType.BUSD:
      return {
        busd: action.inputValue,
        nep: Number(action.inputValue / 3).toFixed(2),
        error: action.inputValue < 0 && "busdError",
      };
    default:
      return state;
  }
};
