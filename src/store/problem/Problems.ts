import axios from "axios";
import { Action } from "redux";
import * as A from "./Action";
import type * as T from "../propsType/props";

export type state = {
  payload?: T.jsonData[];
};

type props = { data: T.jsonData[] };

type saveProblems = Action<"SAVE_PROBLEMS"> & props;

type updateProblems = Action<"UPDATE_PROBLEMS"> & props;

type action = saveProblems | updateProblems;

export type reducer = {
  (state: state, action: action): state;
};

/////////////////////////////////////////////////////////////////////////

const initializeState = {};

const SAVE_PROBLEMS = "SAVE_PROBLEMS";
const UPDATE_PROBLEMS = "UPDATE_PROBLEMS";

export const getProblems = () => (dispatch?: any, getState?: any) => {
  const url = "http://localhost:3000/fe-problems.json";

  axios
    .get(url)
    .then((result) => {
      dispatch(A.saveProblems(SAVE_PROBLEMS, result.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const save = (objs: T.jsonData[]) => (
  dispatch?: any,
  getState?: any
) => {
  dispatch(A.saveProblems(SAVE_PROBLEMS, objs));
};

export const add = (obj: T.jsonData) => (dispatch?: any, getState?: any) => {
  const problems = getState().problemsReducer.payload;
  const targetIdx = getState().activeReducer.index;
  const copy: T.jsonData[] = Object.assign([], problems);

  try {
    copy.splice(targetIdx + 1, 0, obj);
    dispatch(A.updateProblems(UPDATE_PROBLEMS, copy));
  } catch (error) {
    console.log(error);
  }
};

export const remove = (key: number) => async (
  dispatch?: any,
  getState?: any
) => {
  dispatch(
    A.updateProblems(
      UPDATE_PROBLEMS,
      await newList(key, getState().problemsReducer.payload)
    )
  );
};

const newList = (key: number, list: T.jsonData[]) => {
  return new Promise<T.jsonData[]>((resolve, reject) => {
    const problems: T.jsonData[] = Object.assign([], list);
    const id = key;

    if (problems.length === 0) reject(list);

    const newProblems = problems.filter((problem) => problem.id !== id);
    resolve(newProblems);
  });
};

const problemsReducer: reducer = (state = initializeState, action) => {
  switch (action.type) {
    case SAVE_PROBLEMS:
      return { ...state, payload: action.data };
    case UPDATE_PROBLEMS:
      return { ...state, payload: action.data };
    default:
      return state;
  }
};

export default problemsReducer;
