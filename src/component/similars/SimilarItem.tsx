import React, { useCallback, useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/similars/SimilarItem.scss';
import * as actions from '../../action/Action';
import type * as AP from '../../action/types/ActionProps';
import type * as S from '../../store/Store';

type ASelector = AP.jsonData[] | undefined;
type NSelector = number | undefined;

type props = {
    index: number;
    obj: AP.jsonData;
};

type newObject = {
    pList: AP.jsonData[];
    sList: AP.jsonData[];
};

type assignObj = {
    (): newObject;
};

type addProblem = {
    (idx: number, obj: AP.jsonData): void;
};

type changeProblem = {
    (idx: number, obj: AP.jsonData): void;
};

type dispatchAct = {
    (pList: AP.jsonData[], sList: AP.jsonData[]): void;
}

const SimilarItem = ({index, obj}: props) => {
    const dispatch = useDispatch();
    const problemsObj = useSelector<S.reducer, ASelector>(state => state?.problemsReducer?.problemsObj);
    const similarsObj = useSelector<S.reducer, ASelector>(state => state?.similarsReducer?.similarsObj);
    const targetIndex = useSelector<S.reducer, NSelector>(state => state?.isActiveReducer?.index);
    //const targetObj = useSelector<S.reducer, OSelector>(state => state.isActiveReducer?.obj);
    const [problemList, setProblemList] = useState<AP.jsonData[]>([]);
    const [similarList, setSimilarList] = useState<AP.jsonData[]>([]);

    const assignObj = useCallback<assignObj>(() => {
        const pList = Object.assign([], problemList);
        const sList = Object.assign([], similarList);

        return { 'pList': pList, 'sList': sList };
    },[problemList, similarList]);

    const addProblem = useCallback<addProblem>((index, obj) => {
        const newObj = assignObj();
        
        if (newObj !== undefined && targetIndex !== undefined) {
            newObj.pList.splice(targetIndex + 1, 0, obj);
            newObj.sList.splice(index, 1);

            dispatchAct(newObj.pList, newObj.sList);
        }
        // eslint-disable-next-line
    },[dispatch, problemList, similarList, targetIndex]);

    const changeProblem = useCallback<changeProblem>((index, obj) => {
        const newObj = assignObj();

        if (newObj !== undefined && targetIndex !== undefined) {
            const tempObj: AP.jsonData = newObj.pList[targetIndex];

            newObj.pList[targetIndex] = newObj.sList[index];
            newObj.sList[index] = tempObj;

            dispatchAct(newObj.pList, newObj.sList);
            dispatch(actions.showSimilars(targetIndex, obj));
        }        
        // eslint-disable-next-line
    },[targetIndex, problemList, similarList]);

    const dispatchAct = useCallback<dispatchAct>((pList, sList) => {
        dispatch(actions.updateProblems(pList));
        dispatch(actions.updateSimilars(sList));
        // eslint-disable-next-line
    },[]);

    useEffect(() => {
        problemsObj ? setProblemList(problemsObj) : setProblemList([]);
        similarsObj ? setSimilarList(similarsObj) : setSimilarList([]);

    },[problemsObj, similarsObj]);

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
};

export default SimilarItem;