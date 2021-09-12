/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { memo, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './css/App.scss';
import * as LD from './utils/LoadData'

const mainContainer = css`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`;

const itemContainer = css`
  height: 100%;
  width: 50vw;
  display: flex;
`;

type props = {
  childProps?: JSX.Element[];
};

const App = memo(({childProps}: props) => {
  const dispatch = useDispatch();
  const [childList] = useState<JSX.Element[] | undefined>(childProps);
  const pUrl = 'http://localhost:3000/fe-problems.json';
  const sUrl = 'http://localhost:3000/fe-similars.json';
  // const itemList = useMemo<JSX.Element[]>(() => {
  //   return [<Problems/>, <Similars/>];
  // },[]);
  const renderItem = (childList?: JSX.Element[]) => {
    return (
      childList &&
        childList.map((content, index) => {
          return (
            <div css={itemContainer} key={index}>
              {content}
            </div>
          )
        })
    );
  };

  useEffect(() => {
    try {
      LD.loadData(dispatch, pUrl, 'PROBLEM');
      LD.loadData(dispatch, sUrl, 'SIMILAR');  
    } catch (error) {
      console.log(error);
    };    
  },[dispatch]);

  return (
    <div className="App">
      <div css={mainContainer}>
        { renderItem(childList) }
      </div>
    </div>
  );
});

export default App;
