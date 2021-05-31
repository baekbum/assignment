import React, { memo, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../css/similars/Similars.scss';
import SimilarItem from './SimilarItem';

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

const Similars = memo(({state} : IProps) => {
    const [similarList, setSimilarList] = useState<IJsonData[]>([]);
    const [init, setInit] = useState<boolean>(false);
    
    useEffect(() => {
        const obj: IJsonData[] | undefined = state.similarsObj;

        if (obj !== undefined) {
            setInit(true);
            setSimilarList(obj);            
        }        
    },[state.similarsObj]);

    return (
        <div className='similars-container'>
            <div className='header'>
                <span className='title'>문항 교체/추가</span>
            </div>
            <div className='content'>
                { state.isActive ? (
                    <>
                        <div className='problem-unit-name'>
                            <span>{state.targetObj.unitName}</span>
                        </div>
                        { init && similarList.length > 0 ? similarList.map((s, i) => <SimilarItem key={s.id} index={i} obj={s}/>) : null }
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
}, areEqual);

function areEqual(prevProps: any, nextProps: any) {
    return (
        prevProps.state.similarsObj === nextProps.state.similarsObj
        && prevProps.state.isActive === nextProps.state.isActive
        && prevProps.state.targetObj === nextProps.state.targetObj
    );
}

function mapStateToProps(state: any) {
    return { 
        state : {
            similarsObj : state.similarsReducer.similarsObj,
            isActive : state.isActiveReducer.similarsShow,
            targetObj : state.isActiveReducer.obj
        }
    };
}

export default connect(mapStateToProps, null) (Similars);