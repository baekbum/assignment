import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../css/similars/Similars.css';
import SimilarItem from './SimilarItem';

const Similars = ({state}) => {
    const [similarList, setSimilarList] = useState([]);
    const [init, setInit] = useState(false);
    
    useEffect(() => {
        const obj = state.similarsObj;

        if (obj) {
            setInit(true);
            setSimilarList(obj);            
        }        
    },[state.similarsObj]);

    return (
        <div className='similars-container'>
            <div className='similars-header'>
                <span className='title'>문항 교체/추가</span>
            </div>
            <div className='similars-content'>
                { state.isActive ? (
                    <>
                        <div className='problem-unit-name'>
                            <span>{state.targetObj.unitName}</span>
                        </div>
                        { init ? similarList.map((s, i) => <SimilarItem key={s.id} index={i} obj={s}/>) : null }
                    </>
                ) : (
                    <div className='disabled'>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Button variant="outline-primary" className='similars-button' disabled >유사문항</Button>
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
};

function mapStateToProps(state) {
    return { 
        state : {
            similarsObj : state.similarsReducer.similarsObj,
            isActive : state.isActiveReducer.similarsShow,
            targetObj : state.isActiveReducer.obj
        }
    };
}

export default connect(mapStateToProps, null) (Similars);