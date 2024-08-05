import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './featured/account/accountSlice';
import customerReducer from './featured/customers/customersSlice';

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer
    }
});

export default store;

