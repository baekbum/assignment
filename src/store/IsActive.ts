import { Action } from "redux";
import * as AT from "../action/ActionType";
import * as AP from "../action/types/ActionProps";

export type state = {
  similarsShow: boolean;
  index?: number;
  obj?: AP.jsonData;
};

type showSimilars = Action<"SHOW_SIMILARS"> & {
  index: number;
  obj: AP.jsonData;
};

type hideSimilars = Action<"HIDE_SIMILARS"> & {
  index: number;
  obj: AP.jsonData;
};

type action = showSimilars | hideSimilars;

export type reducer = {
  (state: state, action: action): state;
};

const initialize = {
  similarsShow: false,
};

const isActiveReducer: reducer = (state = initialize, action) => {
  switch (action.type) {
    case AT.isShow.show_similars:
      return {
        ...state,
        similarsShow: true,
        index: action.index,
        obj: action.obj,
      };
    case AT.isShow.hide_similars:
      return { similarsShow: false };
    default:
      return state;
  }
};

export default isActiveReducer;
