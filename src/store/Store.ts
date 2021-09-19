import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./saga/index";
import problemsReducer from "./problem/Problems";
import similarsReducer from "./similar/Similars";
import activeReducer from "./active/Active";
import type * as P from "./problem/Problems";
import type * as S from "./similar/Similars";
import type * as I from "./active/Active";

const sagaMiddleware = createSagaMiddleware();

export type reducer = {
  problemsReducer: P.state;
  similarsReducer: S.state;
  activeReducer: I.state;
};

const reducers = combineReducers({
  problemsReducer,
  similarsReducer,
  activeReducer,
});

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
