import { Action } from "redux";
import * as AT from "../action/ActionType";
import * as AP from "../action/types/ActionProps";

export type state = {
  problemsObj?: AP.jsonData[];
};

type saveProblems = Action<"SAVE_PROBLEMS"> & {
  data: AP.jsonData[];
};

type updateProblems = Action<"UPDATE_PROBLEMS"> & {
  data: AP.jsonData[];
};

type deleteProblems = Action<"DELETE_PROBLEMS"> & {
  data: AP.jsonData[];
};

type action = saveProblems | updateProblems | deleteProblems;

export type reducer = {
  (state: state, action: action): state;
};

const initializeState = {};

const problemsReducer: reducer = (state = initializeState, action) => {
  switch (action.type) {
    case AT.problems.save_problems:
      return { ...state, problemsObj: action.data };
    case AT.problems.update_problems:
      return { ...state, problemsObj: action.data };
    case AT.problems.delete_problems:
      return { ...state, problemsObj: action.data };
    default:
      return state;
  }
};

export default problemsReducer;
