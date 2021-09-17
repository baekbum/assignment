import type * as P from "../propsType/props";

export const saveSimilars = (iType: string, iData: P.jsonData[]) => {
  return { type: iType, data: iData };
};

export const updateSimilars = (iType: string, iData: P.jsonData[]) => {
  return { type: iType, data: iData };
};
