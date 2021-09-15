/** @jsxImportSource @emotion/react */
import React, { lazy, memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type * as AP from '../../action/types/ActionProps';
import type * as Store from '../../store/Store';
import { Div, Span, RenderItems } from '../common/Elements';
import * as P from '../../css/problems/Problems';

type ASelector = AP.jsonData[] | undefined;

const ProblemItem = lazy(() => import('./ProblemItem'));

const Problems = memo(() => {
    const problemList = useSelector<Store.reducer, ASelector>(state => state?.problemsReducer?.problemsObj);
    const [items, setItems] = useState<JSX.Element[]>();

    const render = useCallback((problemList: AP.jsonData[]) => {
        return (
            problemList.map((p, i) => {
                const content = <ProblemItem index={i} obj={p} />;
                return <Div key={p.id}>{content}</Div>
            })
        );
    }, []);
    
    useEffect(() => {
        if (problemList) {
            setItems(render(problemList));
        }
        // eslint-disable-next-line
    },[problemList]);

    return (
        <Div className="problems-container" css={P.problemsContainer}>
            <Div className='header' css={P.header}>
                <Span className="title" css={P.title}>학습지 상세 편집</Span>
            </Div>
            <Div className='content' css={P.content}>
                <RenderItems>{items}</RenderItems>
            </Div>
        </Div>
    );
});

export default Problems;