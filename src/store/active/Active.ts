import { Action } from "redux";
import * as A from "./Action";
import * as T from "../propsType/props";

export type state = {
  similarsShow: boolean;
  index?: number;
  obj?: T.jsonData;
};

type props = {
  index: number;
  obj: T.jsonData;
};

type showSimilars = Action<"SHOW_SIMILARS"> & props;

type hideSimilars = Action<"HIDE_SIMILARS"> & props;

type action = showSimilars | hideSimilars;

export type reducer = {
  (state: state, action: action): state;
};

/////////////////////////////////////////////////////////////////////////

const initialize = {
  similarsShow: false,
};

const SHOW_SIMILARS = "SHOW_SIMILARS";
const HIDE_SIMILARS = "HIDE_SIMILARS";

export const showSimilar = (payload: props) => (
  dispatch?: any,
  getState?: any
) => {
  dispatch(A.showSimilars(SHOW_SIMILARS, payload.index, payload.obj));
};

export const hideSimilar = () => (dispatch?: any, getState?: any) => {
  dispatch(A.hideSimilars(HIDE_SIMILARS));
};

const activeReducer: reducer = (state = initialize, action) => {
  switch (action.type) {
    case SHOW_SIMILARS:
      return {
        ...state,
        similarsShow: true,
        index: action.index,
        obj: action.obj,
      };
    case HIDE_SIMILARS:
      return { similarsShow: false };
    default:
      return state;
  }
};

export default activeReducer;
