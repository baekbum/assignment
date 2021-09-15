import { css } from "@emotion/react";

export const similarsContainer = css`
  height: inherit;
  width: inherit;
  border-left: 0.2vw solid #e0e0e0;
`;

export const header = css`
  height: 7%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 0.2em solid #f5f5f5;
  border-bottom: 0.2em solid #f5f5f5;
`;

export const title = css`
  font-size: 0.875em;
  font-weight: bold;
  line-height: 1.25em;
`;

export const content = css`
  height: 93%;
  overflow: scroll;
  overflow-x: hidden;
  @media screen and (max-width: 800px) {
    overflow-x: scroll;
  }
`;

export const problemUnitName = css`
  background-color: #fafafa;
  padding: 1em;

  span {
    font-size: 0.875em;
    line-height: 1.25em;
    color: #4c4c4c;
  }
`;

export const disabled = css`
  height: inherit;
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const disabledTop = css`
  display: flex;
  align-items: center;
`;

export const disabledBot = css``;

export const similarsBtn = css`
  width: 5vw;
  color: #00abff;
  border: 0.063em solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 0.125em;
  font-size: 0.875em;
  margin-right: 0.5vw;
  margin-bottom: 0.5vh;
`;

export const disabledSpan = css`
  font-size: 0.875em;
  color: #9f9f9f;
  line-height: 1.75em;
`;
