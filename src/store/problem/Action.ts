import type * as P from "../propsType/props";

export const saveProblems = (iType: string, iData: P.jsonData[]) => {
  return { type: iType, data: iData };
};

export const updateProblems = (iType: string, iData: P.jsonData[]) => {
  return { type: iType, data: iData };
};
