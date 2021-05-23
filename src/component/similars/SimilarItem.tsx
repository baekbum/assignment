import React, { memo, useCallback, useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../css/similars/SimilarItem.scss';
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

interface newObject {
    pList: IJsonData[];
    sList: IJsonData[];
};

interface IAssignObj {
    (): newObject;
};

interface IAddProblem {
    (idx: number, obj: IJsonData): void;
};

interface IChangeProblem {
    (idx: number, obj: IJsonData): void;
};

const SimilarItem = memo( ({state, dispatch, index, obj}: any) => {
    const [problemList, setProblemList] = useState<IJsonData[]>([]);
    const [similarList, setSimilarList] = useState<IJsonData[]>([]);

    useEffect(() => {
        setProblemList(state.problemsObj);
        setSimilarList(state.similarsObj);
    },[state.problemsObj, state.similarsObj]);

    const assignObj = useCallback<IAssignObj>(() => {
        let pList: IJsonData[] = Object.assign([], problemList);
        let sList: IJsonData[] = Object.assign([], similarList);

        const obj: newObject = {
            'pList': pList,
            'sList': sList
        }

        return obj;        
    },[problemList, similarList]);

    const addProblem = useCallback<IAddProblem>((index, obj) => {
        const newObj: newObject = assignObj();

        newObj.pList.splice(state.targetIndex + 1, 0, obj);
        newObj.sList.splice(index, 1);
        dispatch.updateProblems(newObj.pList);
        dispatch.updateSimilars(newObj.sList);
        // eslint-disable-next-line
    },[state, dispatch, problemList, similarList]);

    const changeProblem = useCallback<IChangeProblem>((index, obj) => {
        const newObj: newObject = assignObj();
        
        const tempObj: IJsonData = newObj.pList[state.targetIndex];

        newObj.pList[state.targetIndex] = newObj.sList[index];
        newObj.sList[index] = tempObj;

        dispatch.updateProblems(newObj.pList);
        dispatch.updateSimilars(newObj.sList);
        dispatch.showSimilars(state.targetIndex, obj);
        // eslint-disable-next-line
    },[state, dispatch, problemList, similarList]);

    return (
        <div className='similar-item-container'>
            <div className='header'>
                <div style={{display: 'flex', width: '12%', alignItems: 'center', justifyContent: 'center'}}>
                    <span className='problem-type'>{obj.problemType}</span>
                </div>
                <div style={{width: '88%', padding: '1em', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                        <span className='unit-name'>{obj.unitName}</span>
                    </div>
                    <div>
                        <Button variant="outline-primary" className='similars-btn' onClick={addProblem.bind(this, index, obj)}>추가</Button>
                        <Button variant="outline-primary" className='delete-btn' onClick={changeProblem.bind(this, index, obj)}>교체</Button>    
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
        && prevProps.state.similarsObj === nextProps.state.similarsObj
        && prevProps.state.targetIndex === nextProps.state.targetIndex
        && prevProps.state.targetObj === nextProps.state.targetObj
    );
}

function mapStateToProps(state: any) {
    return { 
        state : {
            problemsObj : state.problemsReducer.problemsObj,
            similarsObj : state.similarsReducer.similarsObj,
            targetIndex : state.isActiveReducer.index,
            targetObj : state.isActiveReducer.obj
        }
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        dispatch : {
            updateProblems: (obj: IJsonData) => dispatch({type : actions.updateProblems(), data : obj}),
            updateSimilars: (obj: IJsonData) => dispatch({type : actions.updateSimilars(), data : obj}),
            showSimilars: (index: number, obj: IJsonData) => dispatch({type : actions.showSimilars(), index : index, obj : obj }),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (SimilarItem);