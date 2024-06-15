import {createStore,combineReducers,applyMiddleware} from 'redux';
import {DataReducer} from './DataReducer'
import { thunk } from 'redux-thunk';

const RootReducer = combineReducers({
    DataReducer
})
export const store = createStore(RootReducer,applyMiddleware(thunk))