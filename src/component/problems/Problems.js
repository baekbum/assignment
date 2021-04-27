import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../../css/problems/Problems.css';
import ProblemItem from './ProblemItem';

const Problems = ({state}) => {
    const [problemList, setProblemList] = useState([]);
    const [init, setInit] = useState(false);
    
    useEffect(() => {
        const obj = state.problemsObj;

        if (obj) {
            setProblemList(obj);
            setInit(true);
        }
    },[state.problemsObj]);

    return (
        <div className='problems-container'>
            <div className='problems-header'>
                <span className='title'>학습지 상세 편집</span>
            </div>
            <div className='problems-content'>
                { init ? problemList.map((p, i) => <ProblemItem key={p.id} index={i} obj={p} />) : null }
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return { 
        state : {
            problemsObj : state.problemsReducer.problemsObj
        }
    };
}

export default connect(mapStateToProps, null) (Problems);