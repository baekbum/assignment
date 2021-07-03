import * as types from "./ActionType";
import type * as AP from "./types/ActionProps";

export const saveProblems = (IData: AP.jsonData[]) => {
  return { type: types.problems.save_problems, data: IData };
};

export const updateProblems = (IData: AP.jsonData[]) => {
  return { type: types.problems.update_problems, data: IData };
};

export const deleteProblems = (IData: AP.jsonData[]) => {
  return { type: types.problems.delete_problems, data: IData };
};

export const saveSimilars = (IData: AP.jsonData[]) => {
  return { type: types.similars.save_similars, data: IData };
};

export const updateSimilars = (IData: AP.jsonData[]) => {
  return { type: types.similars.update_similars, data: IData };
};

export const showSimilars = (IIndex: number, IObj: AP.jsonData) => {
  return { type: types.isShow.show_similars, index: IIndex, obj: IObj };
};

export const hideSimilars = () => {
  return { type: types.isShow.hide_similars };
};
