/** @jsxImportSource @emotion/react */
import React, { useCallback } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from "../../store/problem/Problems";
import { showSimilar, hideSimilar } from '../../store/active/Active';
import type * as T from '../../store/propsType/props';
import type * as Store from '../../store/Store';
import { Div, Span } from '../common/Elements';
import * as PI from '../../css/problems/ProblemItem';

//type ASelector = T.jsonData[] | undefined;
type NSelector = number | undefined;

type props = {
    index: number;
    obj: T.jsonData;
};

type showSimilars = {
    (idx: number, obj: T.jsonData): void;
};

type deleteProblem = {
    (id: number): void;
};

const ProblemItem = ({index, obj}: props) => {
    //const problemsObj = useSelector<Store.reducer, ASelector>(state => state?.problemsReducer?.payload);
    const targetIndex = useSelector<Store.reducer, NSelector>(state => state?.activeReducer?.index);
    const dispatch = useDispatch();

    const showSimilars = useCallback<showSimilars>((index, obj) => {
        const payload = {index, obj};
        dispatch(showSimilar(payload));
    },[dispatch])

    const deleteProblem = useCallback<deleteProblem>((id) => {
        try {
            dispatch(remove(id));
            dispatch(hideSimilar());    
        } catch (error) {
            console.log(error);
        }        
    },[dispatch]);

    return (
        <Div className='problem-item-container' css={PI.problemsItemContainer}>
            <Div className='header' css={PI.header}>
                <Div className='header-left' css={PI.headerLeft}>
                    <Span className='problem-type' css={PI.problemType}>{obj.problemType}</Span>
                </Div>
                <Div className='header-right' css={PI.headerRight}>
                    <Div>
                        <Span className='unit-name' css={PI.unitName}>{obj.unitName}</Span>
                    </Div>
                    <Div>
                        <Button variant="outline-primary" className='similars-btn' css={PI.similarsBtn} onClick={showSimilars.bind(null, index, obj)} active={targetIndex === index ? true : false} >유사문항</Button>
                        <Button variant="outline-primary" className='delete-btn' css={PI.deleteBtn} onClick={deleteProblem.bind(null, obj.id)} >삭제</Button>    
                    </Div>
                </Div>
            </Div>
            <Div className='content' css={PI.content}>
                <Div className='content-left' css={PI.contentLeft}>
                    <Span className='index' css={PI.index}>{index + 1}</Span>
                </Div>
                <Div className='content-right' css={PI.contentRight}>
                    <Image src={obj.problemURL} rounded />
                </Div>
            </Div>
        </Div>
    );
};

export default ProblemItem;