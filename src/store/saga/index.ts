import { all } from "redux-saga/effects";
import { watchProblemSaga } from "../problem/Problems";
import { watchSimilarSaga } from "../similar/Similars";
import { watchActiveSaga } from "../active/Active";

export default function* rootSaga() {
  yield all([watchProblemSaga(), watchSimilarSaga(), watchActiveSaga()]);
}
