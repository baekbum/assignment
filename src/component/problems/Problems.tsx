import React, { lazy, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../css/problems/Problems.scss';
import type * as AP from '../../action/types/ActionProps';
import type * as S from '../../store/Store';
import RenderItems from '../common/RenderItems';

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
    const problemList = useSelector<S.reducer, ASelector>(state => state?.problemsReducer?.problemsObj);
    const [items, setItems] = useState<JSX.Element[]>();
    const observer = useRef<any>();

    const lastElementRef = useCallback((node) => {
        setObserver(observer, node);    
    }, []);

    const render = (problemList: AP.jsonData[]) => {
        return (
            problemList.map((p, i) => {
                const content = <ProblemItem index={i} obj={p} />;
    
                return (problemList.length === (i + 1)) ? (
                    <div ref={lastElementRef} key={p.id}>{content}</div>
                ) : (
                    <div key={p.id}>{content}</div>
                )
            })
        );
    }
    
    useEffect(() => {
        if (problemList) {
            setItems(render(problemList));
        }
        // eslint-disable-next-line
    },[problemList]);

    return (
        <div className='problems-container'>
            <div className='header'>
                <span className='title'>학습지 상세 편집</span>
            </div>
           <div className='content'>
               <RenderItems children={items} />
            </div>       
        </div>        
    );
});

export default Problems;