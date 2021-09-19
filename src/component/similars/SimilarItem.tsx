/** @jsxImportSource @emotion/react */
import React, { useCallback } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as PRO from "../../store/problem/Problems";
import * as SIM from "../../store/similar/Similars";
import * as ACT from "../../store/active/Active";
import type * as T from '../../store/propsType/props';
import type * as Store from '../../store/Store';
import { Div, Span } from '../common/Elements';
import * as SI from '../../css/similars/SimilarItem';

type ASelector = T.jsonData[] | undefined;
type NSelector = number | undefined;

type props = {
    index: number;
    obj: T.jsonData;
};

type addProblem = {
    (idx: number, obj: T.jsonData): void;
};

type changeProblem = {
    (idx: number, obj: T.jsonData): void;
};

const SimilarItem = ({index, obj}: props) => {
    const problemsObj = useSelector<Store.reducer, ASelector>(state => state?.problemsReducer?.payload);
    const similarsObj = useSelector<Store.reducer, ASelector>(state => state?.similarsReducer?.payload);
    const targetIndex = useSelector<Store.reducer, NSelector>(state => state?.activeReducer?.index);
    const dispatch = useDispatch();

    const addProblem = useCallback<addProblem>((index, obj) => {
        dispatch(PRO.add(obj));
        dispatch(SIM.remove(index));
        // eslint-disable-next-line
    },[dispatch]);

    const changeProblem = useCallback<changeProblem>((index, obj) => {
        if (problemsObj !== undefined && similarsObj !== undefined && targetIndex !== undefined) {
            const copyPro: T.jsonData[] = Object.assign([], problemsObj);
            const copySim: T.jsonData[] = Object.assign([], similarsObj);
            const temp: T.jsonData = copyPro[targetIndex];
            const payload = {index: targetIndex, obj};

            copyPro[targetIndex] = copySim[index];
            copySim[index] = temp;

            dispatch(PRO.save(copyPro));
            dispatch(SIM.save(copySim));
            dispatch(ACT.showSimilar(payload));
        } 
        // eslint-disable-next-line
    },[targetIndex, problemsObj, similarsObj]);

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
