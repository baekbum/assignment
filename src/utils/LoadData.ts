import axios from "axios";
import * as actions from "../action/Action";

type loadProblemsProps = {
  (dispatch: any): void;
};

type loadSimilarsProps = {
  (dispatch: any): void;
};

export const loadProblemsData: loadProblemsProps = (dispatch) => {
  axios
    .get("http://localhost:3000/fe-problems.json")
    .then((result) => {
      dispatch(actions.saveProblems(result.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const loadSimilarsData: loadSimilarsProps = (dispatch) => {
  axios
    .get("http://localhost:3000/fe-similars.json")
    .then((result) => {
      dispatch(actions.saveSimilars(result.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
