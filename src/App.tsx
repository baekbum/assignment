/** @jsxImportSource @emotion/react */
import React, { memo, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Div } from './component/common/Elements';
import * as PRO from "./store/problem/Problems";
import * as SIM from "./store/similar/Similars";
import {mainContainer, itemContainer} from './css/App';

const App = memo(({ children } : any) => {
  const dispatch = useDispatch();
  const [childList] = useState<JSX.Element[] | undefined>(children);

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
      dispatch({ type: PRO.actionList.GET_PROBLEMS });
      dispatch({ type: SIM.actionList.GET_SIMILARS });
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
