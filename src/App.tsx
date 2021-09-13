/** @jsxImportSource @emotion/react */
import React, { memo, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Div } from './component/common/Elements';
import * as LD from './utils/LoadData'
import {mainContainer, itemContainer} from './css/App';

const App = memo(({ children } : any) => {
  const dispatch = useDispatch();
  const [childList] = useState<JSX.Element[] | undefined>(children);
  const pUrl = 'http://localhost:3000/fe-problems.json';
  const sUrl = 'http://localhost:3000/fe-similars.json';

  const renderItem = useCallback((childList?: JSX.Element[]) => {
    return (
      childList &&
        childList.map((content, index) => {
          return (
            <Div className="item-container" css={itemContainer} key={index}>
              {content}
            </Div>
          )
        })
    );
  }, []);

  useEffect(() => {
    try {
      LD.loadData(dispatch, pUrl, 'PROBLEM');
      LD.loadData(dispatch, sUrl, 'SIMILAR');  
    } catch (error) {
      console.log(error);
    };    
  },[dispatch]);

  return (
    <Div className="App">
      <Div className="main-container" css={mainContainer}>
        { renderItem(childList) }
      </Div>
    </Div>
  );
});

export default App;
