import * as types from '../action/ActionType';

interface IState {
    problemsObj?: Array<IJsonData>;
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

const problemsReducer: IReducer = (state: IState = {}, action: IAction) => {
    switch(action.type) {
        case types.SAVE_PROBLEMS:
            return { problemsObj : action.data }
        case types.UPDATE_PROBLEMS:
            return { problemsObj : action.data }
        case types.DELETE_PROBLEMS:
            return { problemsObj : action.data }
        default:
            return state;
    }
}

export default problemsReducer;