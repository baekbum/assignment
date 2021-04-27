import React, { useCallback, useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../css/similars/SimilarItem.css';
import * as actions from '../../action/Action';

const SimilarItem = ({state, dispatch, index, obj}) => {
    const [problemList, setProblemList] = useState([]);
    const [similarList, setSimilarList] = useState([]);

    useEffect(() => {
        setProblemList(state.problemsObj);
        setSimilarList(state.similarsObj);
    },[state.problemsObj, state.similarsObj]);

    const addProblem = useCallback((index, obj) => {
        let pList = Object.assign([], problemList);
        let sList = Object.assign([], similarList);
        pList.splice(state.targetIndex + 1, 0, obj);
        sList.splice(index, 1);
        dispatch.updateProblems(pList);
        dispatch.updateSimilars(sList);
        // eslint-disable-next-line
    },[state, dispatch, problemList, similarList]);

    const changeProblem = useCallback((index) => {
        let pList = Object.assign([], problemList);
        let sList = Object.assign([], similarList);
        let tempObj = pList[state.targetIndex];

        pList[state.targetIndex] = sList[index];
        sList[index] = tempObj;

        dispatch.updateProblems(pList);
        dispatch.updateSimilars(sList);
        // eslint-disable-next-line
    },[state, dispatch, problemList, similarList]);

    return (
        <div className='similar-item-container'>
            <div className='similar-item-header'>
                <div style={{display: 'flex', width: '12%', alignItems: 'center', justifyContent: 'center'}}>
                    <span className='problem-type'>{obj.problemType}</span>
                </div>
                <div style={{width: '88%', padding: '1em', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                        <span className='unit-name'>{obj.unitName}</span>
                    </div>
                    <div>
                        <Button variant="outline-primary" className='similars-button' onClick={addProblem.bind(this, index, obj)}>추가</Button>
                        <Button variant="outline-primary" className='delete-button' onClick={changeProblem.bind(this, index)}>교체</Button>    
                    </div>                    
                </div>
            </div>
            <div className='similar-item-content'>
                <div style={{display: 'flex', width: '12%', justifyContent: 'center'}}>
                    <span className='index'>{index + 1}</span>
                </div>
                <div style={{width: '88%', padding: '1em'}}>
                    <Image src={obj.problemURL} rounded />
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return { 
        state : {
            problemsObj : state.problemsReducer.problemsObj,
            similarsObj : state.similarsReducer.similarsObj,
            targetIndex : state.isAtiveReducer.index,
            targetObj : state.isAtiveReducer.obj
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch : {
            updateProblems: (obj) => dispatch({type : actions.updateProblems(), data : obj}),
            updateSimilars: (obj) => dispatch({type : actions.updateSimilars(), data : obj})
        }        
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (SimilarItem);