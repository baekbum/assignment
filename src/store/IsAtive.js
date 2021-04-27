import * as types from '../action/ActionType';

const isAtiveReducer = (state = { similarsShow : false, index : '', obj : {} }, action) => {
    switch(action.type) {
        case types.SHOW_SIMILARS:
            return { similarsShow : true,  index : action.index, obj : action.obj }
        case types.HIDE_SIMILARS:
            return { similarsShow : false,  index : '' }
        default:
            return state;
    }
}

export default isAtiveReducer;