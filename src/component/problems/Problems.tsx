/** @jsxImportSource @emotion/react */
import React, { lazy, memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type * as AP from '../../action/types/ActionProps';
import type * as S from '../../store/Store';
import RenderItems from '../common/RenderItems';
import { Div, Span } from '../common/Elements';
import {problemsContainer, title, header, content} from '../../css/problems/Problems';

type ASelector = AP.jsonData[] | undefined;

const ProblemItem = lazy(() => import('./ProblemItem'));

const Problems = memo(() => {
    const problemList = useSelector<S.reducer, ASelector>(state => state?.problemsReducer?.problemsObj);
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
        <Div className="problems-container" css={problemsContainer}>
            <Div className='header' css={header}>
                <Span className="title" css={title}>학습지 상세 편집</Span>
            </Div>
            <Div className='content' css={content}>
                <RenderItems>{items}</RenderItems>
            </Div>
        </Div>
    );
});

export default Problems;