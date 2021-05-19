import * as types from '../action/ActionType';

interface IState {
    similarsObj?: Array<IJsonData>;
};

interface IAction {
    type: string;
    data: Array<IJsonData>;
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

const similarsReducer: IReducer = (state: IState = {}, action: IAction) => {
    switch(action.type) {
        case types.SAVE_SIMILARS:
            return { similarsObj : action.data }
        case types.UPDATE_SIMILARS:
            return { similarsObj : action.data }
        default:
            return state;
    }
}

export default similarsReducer;