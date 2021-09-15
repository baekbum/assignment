import { css } from "@emotion/react";

export const style = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  @media screen and (max-width: 640px) {
    html {
      font-size: 3px;
    }
  }

  @media screen and (min-width: 641px) and (max-width: 800px) {
    html {
      font-size: 4.5px;
    }
  }

  @media screen and (min-width: 801px) and (max-width: 960px) {
    html {
      font-size: 6px;
    }
  }

  @media screen and (min-width: 961px) and (max-width: 1120px) {
    html {
      font-size: 8.5px;
    }
  }

  @media screen and (min-width: 1121px) and (max-width: 1280px) {
    html {
      font-size: 10px;
    }
  }

  @media screen and (min-width: 1280px) and (max-width: 1440px) {
    html {
      font-size: 11.5px;
    }
  }

  @media screen and (min-width: 1441px) and (max-width: 1600px) {
    html {
      font-size: 13px;
    }
  }

  @media screen and (min-width: 1601px) and (max-width: 1760px) {
    html {
      font-size: 14.5px;
    }
  }

  @media screen and (min-width: 1761px) and (max-width: 1920px) {
    html {
      font-size: 16px;
    }
  }
`;
