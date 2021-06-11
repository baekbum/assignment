import React, { useCallback, useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/similars/SimilarItem.scss';
import * as actions from '../../action/Action';

interface IProps {
    index: number;
    obj: IJsonData;
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

interface newObject {
    pList: IJsonData[];
    sList: IJsonData[];
};

interface IAssignObj {
    (): newObject;
};

interface IAddProblem {
    (idx: number, obj: IJsonData): void;
};

interface IChangeProblem {
    (idx: number, obj: IJsonData): void;
};

const SimilarItem = ({index, obj}: IProps) => {
    const problemsObj = useSelector<any, IJsonData[]>(state => state?.problemsReducer?.problemsObj);
    const similarsObj = useSelector<any, IJsonData[]>(state => state?.similarsReducer?.similarsObj);
    const targetIndex = useSelector<any, number>(state => state?.isActiveReducer?.index);
    // eslint-disable-next-line
    const targetObj = useSelector<any, IJsonData>(state => state.isActiveReducer?.obj);
    const dispatch = useDispatch<any>();
    const [problemList, setProblemList] = useState<IJsonData[]>([]);
    const [similarList, setSimilarList] = useState<IJsonData[]>([]);

    useEffect(() => {
        setProblemList(problemsObj);
        setSimilarList(similarsObj);
    },[problemsObj, similarsObj]);

    const assignObj = useCallback<IAssignObj>(() => {
        let pList: IJsonData[] = Object.assign([], problemList);
        let sList: IJsonData[] = Object.assign([], similarList);

        const obj: newObject = {
            'pList': pList,
            'sList': sList
        }

        return obj;        
    },[problemList, similarList]);

    const addProblem = useCallback<IAddProblem>((index, obj) => {
        const newObj: newObject = assignObj();

        newObj.pList.splice(targetIndex + 1, 0, obj);
        newObj.sList.splice(index, 1);

        dispatch({type : actions.updateProblems(), data : newObj.pList});
        dispatch({type : actions.updateSimilars(), data : newObj.sList});
        // eslint-disable-next-line
    },[targetIndex, problemList, similarList]);

    const changeProblem = useCallback<IChangeProblem>((index, obj) => {
        const newObj: newObject = assignObj();
        
        const tempObj: IJsonData = newObj.pList[targetIndex];

        newObj.pList[targetIndex] = newObj.sList[index];
        newObj.sList[index] = tempObj;

        dispatch({type : actions.updateProblems(), data : newObj.pList});
        dispatch({type : actions.updateSimilars(), data : newObj.sList});
        dispatch({type : actions.showSimilars(), index : targetIndex, obj : obj});
        // eslint-disable-next-line
    },[targetIndex, problemList, similarList]);

    return (
        <div className='similar-item-container'>
            <div className='header'>
                <div style={{display: 'flex', width: '12%', alignItems: 'center', justifyContent: 'center'}}>
                    <span className='problem-type'>{obj.problemType}</span>
                </div>
                <div style={{width: '88%', padding: '1em', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                        <span className='unit-name'>{obj.unitName}</span>
                    </div>
                    <div>
                        <Button variant="outline-primary" className='similars-btn' onClick={addProblem.bind(this, index, obj)}>추가</Button>
                        <Button variant="outline-primary" className='delete-btn' onClick={changeProblem.bind(this, index, obj)}>교체</Button>    
                    </div>                    
                </div>
            </div>
            <div className='content'>
                <div style={{display: 'flex', width: '12%', justifyContent: 'center'}}>
                    <span className='index'>{index + 1}</span>
                </div>
                <div style={{width: '88%', padding: '1em'}}>
                    <Image src={obj.problemURL} rounded />
                </div>
            </div>
        </div>
    );
};

export default SimilarItem;