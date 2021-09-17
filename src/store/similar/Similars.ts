import axios from "axios";
import { Action } from "redux";
import * as A from "./Action";
import type * as T from "../propsType/props";

export type state = {
  payload?: T.jsonData[];
};

type data = { data: T.jsonData[] };

type saveSimilars = Action<"SAVE_SIMILARS"> & data;

type updateSimilars = Action<"UPDATE_SIMILARS"> & data;

type action = saveSimilars | updateSimilars;

export type reducer = {
  (state: state, action: action): state;
};

/////////////////////////////////////////////////////////////////////////

const initializeState = {};

const SAVE_SIMILARS = "SAVE_SIMILARS";
const UPDATE_SIMILARS = "UPDATE_SIMILARS";

export const getSimilars = () => (dispatch?: any, getState?: any) => {
  const url = "http://localhost:3000/fe-similars.json";

  axios
    .get(url)
    .then((result) => {
      dispatch(A.saveSimilars(SAVE_SIMILARS, result.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const save = (objs: T.jsonData[]) => (
  dispatch?: any,
  getState?: any
) => {
  dispatch(A.saveSimilars(SAVE_SIMILARS, objs));
};

export const remove = (index: number) => (dispatch?: any, getState?: any) => {
  const similars = getState().similarsReducer.payload;
  const copy: T.jsonData[] = Object.assign([], similars);

  try {
    copy.splice(index, 1);
    dispatch(A.updateSimilars(UPDATE_SIMILARS, copy));
  } catch (error) {
    console.log(error);
  }
};

const similarsReducer: reducer = (state = initializeState, action) => {
  switch (action.type) {
    case SAVE_SIMILARS:
      return { ...state, payload: action.data };
    case UPDATE_SIMILARS:
      return { ...state, payload: action.data };
    default:
      return state;
  }
};

export default similarsReducer;
