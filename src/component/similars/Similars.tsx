import React, { lazy, memo, Suspense, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../../css/similars/Similars.scss';
import type * as AP from '../../action/types/ActionProps';
import type * as S from '../../store/Store';

type ASelector = AP.jsonData[] | undefined;
type OSelector = AP.jsonData | undefined;

const SimilarItem = lazy(() => import('./SimilarItem'));

const Similars = memo(() => {
    const similarsObj = useSelector<S.reducer, ASelector>(state => state?.similarsReducer?.similarsObj);
    const targetObj = useSelector<S.reducer, OSelector>(state => state?.isActiveReducer?.obj);
    const isActive = useSelector<S.reducer, boolean>(state => state?.isActiveReducer?.similarsShow);
    const [similarList, setSimilarList] = useState<AP.jsonData[]>([]);
    
    useEffect(() => {
        if (similarsObj !== undefined) {
            setSimilarList(similarsObj);            
        }        
    },[similarsObj]);

    return (
        <div className='similars-container'>
            <div className='header'>
                <span className='title'>문항 교체/추가</span>
            </div>
            <div className='content'>
                { isActive ? (
                    <>
                        <div className='problem-unit-name'>
                            <span>{ targetObj && targetObj.unitName }</span>
                        </div>
                        <Suspense fallback={<div>...loading</div>}>
                            { similarList.map((s, i) => <SimilarItem key={s.id} index={i} obj={s}/>) }
                        </Suspense>
                    </>
                ) : (
                    <div className='disabled'>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Button variant="outline-primary" className='similars-btn' disabled >유사문항</Button>
                            <span className='disabled-span'>버튼을 누르면</span>
                        </div>
                        <div>
                            <span className='disabled-span'>해당 문제의 유사 문형을 볼 수 있습니다.</span>
                        </div>
                    </div>        
                )}
            </div>
        </div>
    );
});

export default Similars;