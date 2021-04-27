import * as types from '../action/ActionType';

const problemsReducer = (state = [], action) => {
    switch(action.type) {
        case types.SAVE_PROBLEMS:
            return { problemsObj : action.dataList.data }
        case types.UPDATE_PROBLEMS:
            return { problemsObj : action.data }
        case types.DELETE_PROBLEMS:
            return { problemsObj : action.data }
        default:
            return state;
    }
}

export default problemsReducer;