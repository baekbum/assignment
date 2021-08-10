import React, { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../css/problems/Problems.scss';
import type * as AP from '../../action/types/ActionProps';
import type * as S from '../../store/Store';

type ASelector = AP.jsonData[] | undefined;


const ProblemItem = lazy(() => import('./ProblemItem'));

const setObserver = (observer: any, node: HTMLElement) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            console.log('보임!!');
        }
    });

    if (node) observer.current.observe(node);
};

const Problems = memo(() => {
    const problemsObj = useSelector<S.reducer, ASelector>(state => state?.problemsReducer?.problemsObj);
    const [problemList, setProblemList] = useState<AP.jsonData[]>([]);
    const observer = useRef<any>();

    const lastElementRef = useCallback((node) => {
        setObserver(observer, node);    
    }, []);
    
    useEffect(() => {
        if (problemsObj !== undefined) {
            setProblemList(problemsObj);
        }
    },[problemsObj]);

    return (
        <div className='problems-container'>
            <div className='header'>
                <span className='title'>학습지 상세 편집</span>
            </div>
           <div className='content'>
                <Suspense fallback={<div>...loading</div>}>
                    { problemList.length > 0 ? ( 
                        problemList.map((p, i) => {
                            const content = <ProblemItem index={i} obj={p} />;

                            return (problemList.length === (i + 1)) ? (
                                <div ref={lastElementRef} key={p.id}>{content}</div>
                            ) : (
                                <div key={p.id}>{content}</div>
                            )
                        })
                    ) : null
                    }
                </Suspense>
            </div>       
        </div>
    );
});

export default Problems;