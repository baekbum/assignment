import React, { memo, useEffect } from 'react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Problems from './component/problems/Problems';
import Similars from './component/similars/Similars';
import './css/App.scss';
import * as LD from './utils/LoadData'

const App = memo(() => {
  const dispatch = useDispatch();
  const itemList = useMemo<JSX.Element[]>(() => {
    return [<Problems/>, <Similars/>];
  },[])

  useEffect(() => {
    try {
      LD.loadProblemsData(dispatch);
      LD.loadSimilarsData(dispatch);  
    } catch (error) {
      console.log(error);
    };    
  },[dispatch]);

  return (
    <div className="App">
      <div className='main-container'>
        { itemList.length > 0 
        ? itemList.map((content, index) => {
          return (
            <div className='item-container' key={index}>
              {content}
            </div>
          )
        })
        : null
        }
      </div>
    </div>
  );
});

export default App;
