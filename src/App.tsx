import React, { memo, useEffect } from 'react';
import { useState } from 'react';
//import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
//import Problems from './component/problems/Problems';
//import Similars from './component/similars/Similars';
import './css/App.scss';
import * as LD from './utils/LoadData'

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
            <div className='item-container' key={index}>
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
      <div className='main-container'>
        { renderItem(childList) }
      </div>
    </div>
  );
});

export default App;
