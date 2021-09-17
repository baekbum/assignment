import type * as P from "../propsType/props";

export const showSimilars = (
  iType: string,
  iIndex: number,
  iObj: P.jsonData
) => {
  return { type: iType, index: iIndex, obj: iObj };
};

export const hideSimilars = (iType: string) => {
  return { type: iType };
};
