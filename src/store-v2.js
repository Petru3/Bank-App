import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import accountReducer from './featured/account/accountSlice';
import customerReducer from './featured/customers/customersSlice';

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
