import { combineReducers, createStore } from "redux";
import problemsReducer from "./Problems";
import similarsReducer from "./Similars";
import isActiveReducer from "./IsActive";
import type * as P from "./Problems";
import type * as S from "./Similars";
import type * as I from "./IsActive";

export type reducer = {
  problemsReducer: P.state;
  similarsReducer: S.state;
  isActiveReducer: I.state;
};

const reducers = combineReducers({
  problemsReducer,
  similarsReducer,
  isActiveReducer,
});

const store = createStore(reducers);

export default store;
