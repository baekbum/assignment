import * as types from '../action/ActionType';

interface IState {
    similarsShow: boolean;
    index?: number;
    obj?: object;
};

interface IAction {
    type: string;
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

interface IReducer {
    (state: IState, action: IAction): IState;
};

const initialize = {
    similarsShow : false
};

const isActiveReducer: IReducer = (state: IState = initialize, action: IAction) => {
    switch(action.type) {
        case types.SHOW_SIMILARS:
            return { similarsShow : true,  index : action.index, obj : action.obj }
        case types.HIDE_SIMILARS:
            return { similarsShow : false }
        default:
            return state;
    }
}

export default isActiveReducer;