/** @jsxImportSource @emotion/react */
import React, { lazy, memo, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import type * as AP from '../../action/types/ActionProps';
import type * as Store from '../../store/Store';
import { Div, Span, RenderItems } from '../common/Elements';
import * as S from '../../css/similars/Similars';

type ASelector = AP.jsonData[] | undefined;
type OSelector = AP.jsonData | undefined;

const SimilarItem = lazy(() => import('./SimilarItem'));

const Similars = memo(() => {
    const similarsObj = useSelector<Store.reducer, ASelector>(state => state?.similarsReducer?.similarsObj);
    const targetObj = useSelector<Store.reducer, OSelector>(state => state?.isActiveReducer?.obj);
    const isActive = useSelector<Store.reducer, boolean>(state => state?.isActiveReducer?.similarsShow);
    const [similarList, setSimilarList] = useState<AP.jsonData[]>([]);
    
    useEffect(() => {
        if (similarsObj !== undefined) {
            setSimilarList(similarsObj);            
        }        
    },[similarsObj]);

    return (
        <Div className='similars-container' css={S.similarsContainer}>
            <Div className='header' css={S.header}>
                <Span className='title' css={S.title}>문항 교체/추가</Span>
            </Div>
            <Div className='content' css={S.content}>
                { isActive ? (
                    <Div>
                        <Div className='problem-unit-name' css={S.problemUnitName}>
                            <Span>{ targetObj && targetObj.unitName }</Span>
                        </Div>
                        <RenderItems>
                            { similarList.map((s, i) => <SimilarItem key={s.id} index={i} obj={s}/>) }
                        </RenderItems>
                    </Div>
                ) : (
                    <Div className='disabled' css={S.disabled}>
                        <Div className='disabledTop' css={S.disabledTop}>
                            <Button variant="outline-primary" className='similars-btn' css={S.similarsBtn} disabled >유사문항</Button>
                            <Span className='disabled-span' css={S.disabledSpan}>버튼을 누르면</Span>
                        </Div>
                        <Div>
                            <Span className='disabled-span' css={S.disabledSpan}>해당 문제의 유사 문형을 볼 수 있습니다.</Span>
                        </Div>
                    </Div>      
                )}
            </Div>
        </Div>
    );
});

export default Similars;