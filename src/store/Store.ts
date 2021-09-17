import { combineReducers, createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import problemsReducer from "./problem/Problems";
import similarsReducer from "./similar/Similars";
import activeReducer from "./active/Active";
import type * as P from "./problem/Problems";
import type * as S from "./similar/Similars";
import type * as I from "./active/Active";

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

const store = createStore(reducers, applyMiddleware(reduxThunk));

export default store;
