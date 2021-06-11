import React, { lazy, memo, Suspense, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../../css/similars/Similars.scss';
//import SimilarItem from './SimilarItem';

interface IJsonData {
    id: number;
    unitCode: number;
    answerData: string;
    problemLevel: number;
    problemType: string;
    problemURL: string;
    unitName: string;
    needCheckLayout: number;
    source: number;
    hide: number;
    curriculumNumber: number;
    cebuCode: number;
    totalTimes: number;
    correctTimes: number;
    hwpExist: number;
    scorable: number;
    tagTop: null;
    bookDataId: number;
};

const SimilarItem = lazy(() => import('./SimilarItem'));

const Similars = memo(() => {
    const similarsObj = useSelector<any, IJsonData[]>(state => state?.similarsReducer?.similarsObj);
    const isActive = useSelector<any, boolean>(state => state?.isActiveReducer?.similarsShow);
    const targetObj = useSelector<any, IJsonData>(state => state.isActiveReducer?.obj);

    const [similarList, setSimilarList] = useState<IJsonData[]>([]);
    
    useEffect(() => {
        const obj: IJsonData[] = similarsObj;

        if (obj !== undefined) {
            setSimilarList(obj);            
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
                            <span>{targetObj.unitName}</span>
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