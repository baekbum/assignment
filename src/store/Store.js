import { combineReducers, createStore } from 'redux';
import problemsReducer from './Problems';
import similarsReducer from './Similars';
import isAtiveReducer from './IsAtive';


const reducers = combineReducers({
    problemsReducer,
    similarsReducer,
    isAtiveReducer
});

const store = createStore(reducers);

export default store;