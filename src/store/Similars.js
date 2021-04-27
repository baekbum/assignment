import * as types from '../action/ActionType';

const similarsReducer = (state = [], action) => {
    switch(action.type) {
        case types.SAVE_SIMILARS:
            return { similarsObj : action.dataList.data }
        case types.UPDATE_SIMILARS:
            return { similarsObj : action.data }
        default:
            return state;
    }
}

export default similarsReducer;