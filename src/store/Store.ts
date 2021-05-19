import { combineReducers, createStore } from 'redux';
import problemsReducer from './Problems';
import similarsReducer from './Similars';
import isActiveReducer from './IsActive';

const reducers = combineReducers({
    problemsReducer,
    similarsReducer,
    isActiveReducer
});

const store = createStore(reducers);

export default store;