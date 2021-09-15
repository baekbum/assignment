/** @jsxImportSource @emotion/react */
import React, { useCallback } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../action/Action';
import type * as AP from '../../action/types/ActionProps';
import type * as Store from '../../store/Store';
import { Div, Span } from '../common/Elements';
import * as PI from '../../css/problems/ProblemItem';

type ASelector = AP.jsonData[] | undefined;
type NSelector = number | undefined;

type props = {
    index: number;
    obj: AP.jsonData;
};

type showSimilars = {
    (idx: number, obj: AP.jsonData): void;
};

type deleteProblem = {
    (id: number): void;
};

type newProblems = {
    (key: number, problemList: ASelector): Promise<AP.jsonData[]>
};

const ProblemItem = ({index, obj}: props) => {
    const problemsObj = useSelector<Store.reducer, ASelector>(state => state?.problemsReducer?.problemsObj);
    const targetIndex = useSelector<Store.reducer, NSelector>(state => state?.isActiveReducer?.index);
    const dispatch = useDispatch();

    const showSimilars = useCallback<showSimilars>((idx, obj) => {
        dispatch(actions.showSimilars(idx, obj));
    },[dispatch])

    const deleteProblem = useCallback<deleteProblem>((id) => {
        (async function name(id: number, obj: ASelector) {
            try {
                const newState =  await newProblems(id, obj);
                dispatch(actions.deleteProblems(newState));
                dispatch(actions.hideSimilars());
            } catch (error) {
                console.log(error);
            };
        })(id, problemsObj);
        // eslint-disable-next-line
    },[dispatch, problemsObj]);

    const newProblems = useCallback<newProblems>((key, problemList) => {
        return new Promise<AP.jsonData[]>((resolve, reject) => {
            const problems: AP.jsonData[] = Object.assign([], problemList);
            const id = key;

            if (problems.length === 0) {
                reject();
            }

            const newProblems = problems.filter(problem => problem.id !== id);
            resolve(newProblems);
        });
    },[]);

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