import axios from "axios";
import { Action } from "redux";
import * as A from "./Action";
import type * as T from "../propsType/props";
import {
  call,
  put,
  takeLatest,
  select,
  takeEvery,
} from "@redux-saga/core/effects";

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

export const actionList = {
  GET_PROBLEMS: "GET_PROBLEMS",
  SAVE_PROBLEMS: "SAVE_PROBLEMS",
  ADD_PROBLEMS: "ADD_PROBLEMS",
  REMOVE_PROBLEMS: "REMOVE_PROBLEMS",
};

const getApi = () => {
  const url = "http://localhost:3000/fe-problems.json";

  return axios.get(url).then((result) => {
    return result.data.data;
  });
};

function* get() {
  try {
    const data: T.jsonData[] = yield call(getApi);
    yield put(A.saveProblems(SAVE_PROBLEMS, data));
  } catch (error) {
    console.log(error);
  }
}

function* save(action: any) {
  const { payload } = action;
  if (payload) {
    yield put(A.saveProblems(SAVE_PROBLEMS, payload?.objs));
  }
}

function* add(action: any) {
  const { payload } = action;

  if (payload) {
    const problems: T.jsonData[] = yield select(
      (state) => state.problemsReducer.payload
    );
    const targetIdx: number = yield select(
      (state) => state.activeReducer.index
    );
    const copy: T.jsonData[] = Object.assign([], problems);

    try {
      copy.splice(targetIdx + 1, 0, payload?.obj);
      yield put(A.updateProblems(UPDATE_PROBLEMS, copy));
    } catch (error) {
      console.log(error);
    }
  }
}

function* remove(action: any) {
  const { payload } = action;

  if (payload) {
    const problems: T.jsonData[] = yield select(
      (state) => state.problemsReducer.payload
    );

    yield put(
      A.updateProblems(UPDATE_PROBLEMS, newList(payload?.key, problems))
    );
  }
}

const newList = (key: number, list: T.jsonData[]) => {
  const problems: T.jsonData[] = Object.assign([], list);
  const id = key;
  const newProblems = problems.filter((problem) => problem.id !== id);

  return newProblems;
};

export function* watchProblemSaga() {
  yield takeLatest(actionList.GET_PROBLEMS, get);
  yield takeEvery(actionList.SAVE_PROBLEMS, save);
  yield takeEvery(actionList.ADD_PROBLEMS, add);
  yield takeEvery(actionList.REMOVE_PROBLEMS, remove);
}

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
