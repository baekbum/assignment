import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../../css/problems/Problems.scss';
import ProblemItem from './ProblemItem';

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

const Problems = memo( ({state} : any) => {
    const [problemList, setProblemList] = useState<Array<IJsonData>>([]);
    const [init, setInit] = useState<Boolean>(false);
    
    useEffect(() => {
        const obj = state.problemsObj;

        if (obj !== undefined) {
            setProblemList(obj);
            setInit(true);
        }
    },[state.problemsObj]);

    return (
        <div className='problems-container'>
            <div className='header'>
                <span className='title'>학습지 상세 편집</span>
            </div>
            <div className='content'>
                { init ? problemList.map((p, i) => <ProblemItem key={p.id} index={i} obj={p} />) : null }
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