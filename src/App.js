import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from './action/Action';
import Problems from './component/problems/Problems';
import Similars from './component/similars/Similars';
import './css/App.css';

function App ({dispatch}) {
  useEffect(() => {
    let problems = null;
    let similars = null;

    const getData = async () => {
      problems = await axios.get('http://localhost:3000/fe-problems.json');
      similars = await axios.get('http://localhost:3000/fe-similars.json');
      
      dispatch.saveProblems(problems.data);
      dispatch.saveSimilars(similars.data);
    };

    getData();
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
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch : {
      saveProblems: (obj) => dispatch({type : actions.saveProblems(), dataList : obj}),
      saveSimilars: (obj) => dispatch({type : actions.saveSimilars(), dataList : obj})  
    }    
  };
}

export default connect(null, mapDispatchToProps) (App);
