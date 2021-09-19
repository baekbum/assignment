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

export const actionList = {
  GET_SIMILARS: "GET_SIMILARS",
  SAVE_SIMILARS: "SAVE_SIMILARS",
  REMOVE_SIMILARS: "REMOVE_SIMILARS",
};

const getApi = () => {
  const url = "http://localhost:3000/fe-similars.json";

  return axios.get(url).then((result) => {
    return result.data.data;
  });
};

function* get() {
  try {
    const data: T.jsonData[] = yield call(getApi);

    yield put(A.saveSimilars(SAVE_SIMILARS, data));
  } catch (error) {
    console.log(error);
  }
}

function* save(action: any) {
  const { payload } = action;

  if (payload) {
    yield put(A.saveSimilars(SAVE_SIMILARS, payload.objs));
  }
}

function* remove(action: any) {
  const { payload } = action;

  if (payload) {
    const similars: T.jsonData[] = yield select(
      (state) => state.similarsReducer.payload
    );
    const copy: T.jsonData[] = Object.assign([], similars);

    try {
      copy.splice(payload.index, 1);
      yield put(A.updateSimilars(UPDATE_SIMILARS, copy));
    } catch (error) {
      console.log(error);
    }
  }
}

export function* watchSimilarSaga() {
  yield takeLatest(actionList.GET_SIMILARS, get);
  yield takeEvery(actionList.SAVE_SIMILARS, save);
  yield takeEvery(actionList.REMOVE_SIMILARS, remove);
}

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
