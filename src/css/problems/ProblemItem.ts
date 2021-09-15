import { css } from "@emotion/react";

export const problemsItemContainer = css`
  border-bottom: 1vh solid #f5f5f5;
`;

export const header = css`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.3vh solid #f5f5f5;
`;

export const headerLeft = css`
  display: flex;
  width: 12%;
  align-items: center;
  justify-content: center;
`;

export const headerRight = css`
  width: 88%;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const problemType = css`
  color: #9f9f9f;
  font-size: 0.875em;
`;

export const unitName = css`
  color: #4c4c4c;
  font-size: 0.875em;
`;

export const similarsBtn = css`
  width: 5vw;
  color: #00abff;
  border: 0.063em solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 0.125em;
  font-size: 0.875em;
  &:hover {
    color: white;
  }
`;

export const deleteBtn = css`
  margin-left: 0.5vw;
  width: 5vw;
  color: #00abff;
  border: 0.063em solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 0.125em;
  font-size: 0.875em;
  &:hover {
    color: white;
  }
`;

export const content = css`
  display: flex;
`;

export const contentLeft = css`
  display: flex;
  width: 12%;
  justify-content: center;
`;

export const contentRight = css`
  width: 88%;
  padding: 1em;
`;

export const index = css`
  font-weight: bold;
  font-size: 1.5em;
  line-height: 2.188em;
  color: #02c7f2;
`;
