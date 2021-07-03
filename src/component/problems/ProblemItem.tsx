import React, { useCallback } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/problems/ProblemItem.scss';
import * as actions from '../../action/Action';
import type * as AP from '../../action/types/ActionProps';
import type * as S from '../../store/Store';

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
    const problemsObj = useSelector<S.reducer, ASelector>(state => state?.problemsReducer?.problemsObj);
    const targetIndex = useSelector<S.reducer, NSelector>(state => state?.isActiveReducer?.index);
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
                        <Button variant="outline-primary" className='similars-btn' onClick={showSimilars.bind(this, index, obj)} active={targetIndex === index ? true : false} >유사문항</Button>
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
};

export default ProblemItem;