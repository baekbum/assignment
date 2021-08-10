import axios from "axios";
import * as actions from "../action/Action";

type loadDataProps = {
  (dispatch: any, url: string, type: string): void;
};

export const loadData: loadDataProps = (dispatch, url, type) => {
  axios
    .get(url)
    .then((result) => {
      if (type === "PROBLEM") {
        dispatch(actions.saveProblems(result.data.data));
      } else if (type === "SIMILAR") {
        dispatch(actions.saveSimilars(result.data.data));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
