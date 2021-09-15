/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../action/Action';
import type * as AP from '../../action/types/ActionProps';
import type * as Store from '../../store/Store';
import { Div, Span } from '../common/Elements';
import * as SI from '../../css/similars/SimilarItem';

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
    const problemsObj = useSelector<Store.reducer, ASelector>(state => state?.problemsReducer?.problemsObj);
    const similarsObj = useSelector<Store.reducer, ASelector>(state => state?.similarsReducer?.similarsObj);
    const targetIndex = useSelector<Store.reducer, NSelector>(state => state?.isActiveReducer?.index);
    //const targetObj = useSelector<Store.reducer, OSelector>(state => state.isActiveReducer?.obj);
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
        <Div className='similar-item-container' css={SI.similarItemContainer}>
            <Div className='header' css={SI.header}>
                <Div className='header-left' css={SI.headerLeft}>
                    <Span className='problem-type' css={SI.problemType}>{obj.problemType}</Span>
                </Div>
                <Div className='header-right' css={SI.headerRight}>
                    <Div>
                        <Span className='unit-name'>{obj.unitName}</Span>
                    </Div>
                    <Div>
                        <Button variant="outline-primary" className='similars-btn' css={SI.similarsBtn} onClick={addProblem.bind(null, index, obj)}>추가</Button>
                        <Button variant="outline-primary" className='delete-btn' css={SI.deleteBtn} onClick={changeProblem.bind(null, index, obj)}>교체</Button>
                    </Div>
                </Div>
            </Div>
            <Div className='content' css={SI.content}>
                <Div className='content-left' css={SI.contentLeft}>
                    <Span className='index' css={SI.index}>{index + 1}</Span>
                </Div>
                <Div className='content-right' css={SI.contentRight}>
                    <Image src={obj.problemURL} rounded />
                </Div>
            </Div>
        </Div>
    );
};

export default SimilarItem;