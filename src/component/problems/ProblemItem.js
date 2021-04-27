import React, { useCallback } from 'react';
import { Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../css/problems/ProblemItem.css';
import * as actions from '../../action/Action';

const ProblemItem = ({state, dispatch, index, obj}) => {
    const showSimilars = (idx, obj, ref) => {
        //ref.current.setAttribute('class', 'similars-button btn active btn-outline-primary');
        dispatch.showSimilars(idx, obj);
        // eslint-disable-next-line
    };

    const deleteProblem = useCallback(async (id) => {
        const newState = await newProblems(state.problemsObj, id);
        dispatch.deleteProblem(newState);
        dispatch.hideSimilars();
        // eslint-disable-next-line
    },[state.problemsObj]);

    const newProblems = useCallback((problemList, key) => {
        return new Promise(function(resolve, reject) {
            const problems = Object.assign([], problemList);
            const id = key;

            const newProblems = problems.filter(problem => problem.id !== id);
    
            resolve(newProblems);
        });
    },[]);

    return (
        <div className='problem-item-container'>
            <div className='problem-item-header'>
                <div style={{display: 'flex', width: '12%', alignItems: 'center', justifyContent: 'center'}}>
                    <span className='problem-type'>{obj.problemType}</span>
                </div>
                <div style={{width: '88%', padding: '1em', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                        <span className='unit-name'>{obj.unitName}</span>
                    </div>
                    <div>
                        <Button variant="outline-primary" className='similars-button' onClick={showSimilars.bind(this, index, obj)} active={state.targetIndex === index} >유사문항</Button>
                        <Button variant="outline-primary" className='delete-button' onClick={deleteProblem.bind(this, obj.id)} >삭제</Button>    
                    </div>                    
                </div>
            </div>
            <div className='problem-item-content'>
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
            targetIndex : state.isAtiveReducer.index
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch : {
            showSimilars: (index, obj) => dispatch({type : actions.showSimilars(), index : index, obj : obj }),
            hideSimilars: () => dispatch({type : actions.hideSimilars() }),
            deleteProblem: (obj) => dispatch({type : actions.deleteProblems(), data : obj})
        }        
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (ProblemItem);