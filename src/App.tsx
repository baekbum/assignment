import axios from 'axios';
import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './action/Action';
import Problems from './component/problems/Problems';
import Similars from './component/similars/Similars';
import './css/App.scss';

interface IJsonData {
  id: number;
  unitCode: number;
  answerData: string;
  problemLevel: number;
  problemType: string;
  problemURL: string;
  unitName: string;
  needCheckLayout: number;
  source: number;
  hide: number;
  curriculumNumber: number;
  cebuCode: number;
  totalTimes: number;
  correctTimes: number;
  hwpExist: number;
  scorable: number;
  tagTop: null;
  bookDataId: number;
};

const App = memo(() => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    axios.get('http://localhost:3000/fe-problems.json')
    .then((result) => {
      const problems: IJsonData[] = result.data.data;

      dispatch({type : actions.saveProblems(), data : problems});
    }).catch((err) => {
      console.log(err);
    });

    axios.get('http://localhost:3000/fe-similars.json')
    .then((result) => {
      const similars: IJsonData[] = result.data.data;

      dispatch({type : actions.saveSimilars(), data : similars});
    }).catch((err) => {
      console.log(err);
    });
  });

  return (
    <div className="App">
      <div className='main-container'>
        <div className='item-container'>
          <Problems />
        </div>
        <div className='item-container'>
          <Similars />
        </div>        
      </div>      
    </div>
  );
});

export default App;
