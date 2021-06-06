import React, { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import '../../css/problems/Problems.scss';
//import ProblemItem from './ProblemItem';

interface IProps {
    state?: any;
};

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

const ProblemItem = lazy(() => import('./ProblemItem'));

const Problems = memo(({state} : IProps) => {
    const [problemList, setProblemList] = useState<IJsonData[]>([]);
    const observer = useRef<any>();

    const lastElementRef = useCallback((node) => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log('보임!!');
            }
        });

        if (node) observer.current.observe(node);
    }, []);

    useEffect(() => {

    }, []);
    
    useEffect(() => {
        const obj: IJsonData[] | undefined = state.problemsObj;

        if (obj !== undefined) {
            setProblemList(obj);
        }
    },[state.problemsObj]);

    return (
        <div className='problems-container'>
            <div className='header'>
                <span className='title'>학습지 상세 편집</span>
            </div>
           <div className='content'>
                <Suspense fallback={<div>...loading</div>}>
                    { 
                        problemList.map((p, i) => 
                            { 
                                if (problemList.length === i + 1) {
                                    return (
                                        <div ref={lastElementRef} key={p.id}>
                                            <ProblemItem index={i} obj={p} />
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={p.id}>
                                            <ProblemItem index={i} obj={p} />
                                        </div>
                                    )
                                }
                            }                        
                        ) 
                    }
                </Suspense>
            </div>       
        </div>
    );
}, areEqual);

function areEqual(prevProps: any, nextProps: any) {
    return (
        prevProps.state.problemsObj === nextProps.state.problemsObj
    );
}

function mapStateToProps(state: any) {
    return { 
        state : {
            problemsObj : state.problemsReducer.problemsObj
        }
    };
}

export default connect(mapStateToProps, null) (Problems);