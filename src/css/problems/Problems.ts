import { css } from "@emotion/react";

export const problemsContainer = css`
  height: inherit;
  width: inherit;
  border-right: 0.2vw solid #e0e0e0;
`;

export const header = css`
  height: 7%;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 1em;
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
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  @media screen and (max-width: 800px) {
    overflow-x: scroll;
  }
`;
