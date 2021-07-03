import { Action } from "redux";
import * as AT from "../action/ActionType";
import * as AP from "../action/types/ActionProps";

export type state = {
  similarsObj?: AP.jsonData[];
};

type saveSimilars = Action<"SAVE_SIMILARS"> & {
  data: AP.jsonData[];
};

type updateSimilars = Action<"UPDATE_SIMILARS"> & {
  data: AP.jsonData[];
};

type deleteSimilars = Action<"DELETE_SIMILARS"> & {
  data: AP.jsonData[];
};

type action = saveSimilars | updateSimilars | deleteSimilars;

export type reducer = {
  (state: state, action: action): state;
};

const initializeState = {};

const similarsReducer: reducer = (state = initializeState, action) => {
  switch (action.type) {
    case AT.similars.save_similars:
      return { ...state, similarsObj: action.data };
    case AT.similars.update_similars:
      return { ...state, similarsObj: action.data };
    default:
      return state;
  }
};

export default similarsReducer;
