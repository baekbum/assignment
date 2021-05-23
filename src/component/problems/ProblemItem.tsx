import React, { memo, useCallback } from 'react';
import { Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../css/problems/ProblemItem.scss';
import * as actions from '../../action/Action';

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

interface IShowSimilars {
    (idx: number, obj: IJsonData): void
};

interface IDeleteProblem {
    (id: number): void
};

interface INewProblems {
    (problemList: IJsonData[], key: number): Promise<IJsonData[]>
};

const ProblemItem = memo( ({state, dispatch, index, obj}: any) => {

    const showSimilars = useCallback<IShowSimilars>((idx, obj) => {
        dispatch.showSimilars(idx, obj);
    },[dispatch])

    const deleteProblem = useCallback<IDeleteProblem>(async (id) => {
        const newState: IJsonData[] = await newProblems(state.problemsObj, id);
        dispatch.deleteProblem(newState);
        dispatch.hideSimilars();
        // eslint-disable-next-line
    },[state.problemsObj, dispatch]);

    const newProblems = useCallback<INewProblems>((problemList, key) => {
        return new Promise<IJsonData[]>((resolve, reject) => {
            const problems: IJsonData[] = Object.assign([], problemList);
            const id: number = key;

            const newProblems: IJsonData[] = problems.filter(problem => problem.id !== id);
    
            resolve(newProblems);
        });
    },[]);

    return (
        <div className='problem-item-container'>
            <div className='header'>
                <div style={{display: 'flex', width: '12%', alignItems: 'center', justifyContent: 'center'}}>
                    <span className='problem-type'>{obj.problemType}</span>
                </div>
                <div style={{width: '88%', padding: '1em', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                        <span className='unit-name'>{obj.unitName}</span>
                    </div>
                    <div>
                        <Button variant="outline-primary" className='similars-btn' onClick={showSimilars.bind(this, index, obj)} active={state.targetIndex === index ? true : false} >유사문항</Button>
                        <Button variant="outline-primary" className='delete-btn' onClick={deleteProblem.bind(this, obj.id)} >삭제</Button>    
                    </div>                    
                </div>
            </div>
            <div className='content'>
                <div style={{display: 'flex', width: '12%', justifyContent: 'center'}}>
                    <span className='index'>{index + 1}</span>
                </div>
                <div style={{width: '88%', padding: '1em'}}>
                    <Image src={obj.problemURL} rounded />
                </div>
            </div>
        </div>
    );
}, areEqual);

function areEqual(prevProps: any, nextProps: any) {
    return (
        prevProps.state.problemsObj === nextProps.state.problemsObj
        && prevProps.state.targetIndex === nextProps.state.targetIndex
    );
}

function mapStateToProps(state: any) {
    return { 
        state : {
            problemsObj : state.problemsReducer.problemsObj,
            targetIndex : state.isActiveReducer.index
        }
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        dispatch : {
            showSimilars: (index: number, obj: IJsonData) => dispatch({type : actions.showSimilars(), index : index, obj : obj }),
            hideSimilars: () => dispatch({type : actions.hideSimilars() }),
            deleteProblem: (obj: IJsonData) => dispatch({type : actions.deleteProblems(), data : obj})
        }        
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (ProblemItem);