import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {

            prepare(amount, purpose) {
                return {
                    payload: {
                        amount,
                        purpose
                    }
                }
            },
            
            reducer(state, action) {
                if (state.loan !== 0) return;

                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += action.payload.amount;
            }
        },
        payLoan(state) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
        convertingCurrency(state){
            state.isLoading = true;

        },
    },
});

export const {withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
    if(currency === 'USD') 
        return { 
            type: 'account/deposit', 
            payload: amount 
        }
    
    return async function(dispatch, getState) {
        dispatch({ type: 'account/convertingCurrency' })

        // Api Call
        const host = 'api.frankfurter.app';
        const res = await fetch(`https://${host}/latest
            ?amount=${amount}
            &from=${currency}&to=USD`)
        const data = await res.json();
        const converted = data.rates.USD;
        console.log(converted)
        // return action

        dispatch({ type: 'account/deposit', payload: converted })
    }
    
}

console.log(requestLoan(1000, 'Buy car'));

export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//     switch(action.type){
//         case ACCOUNT_DEPOSIT:
//             return {
//                 ...state,
//                 balance: state.balance + action.payload,
//                 isLoading: false,
//             }
//         case ACCOUNT_WITHDRAW:
//             return {
//                 ...state,
//                 balance: state.balance - action.payload,
//             }
//         case ACCOUNT_REQUESTLOAN:
//             if(state.loan > 0) return state
//             return {
//                 ...state,

//                 // LATER
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose,
//                 balance: state.balance + action.payload.amount
//             }
//         case ACCOUNT_PAYLOAN:
//             return {
//                 ...state,
//                 loan: 0,
//                 loanPurpose: "",
//                 balance: state.balance - state.loan
//             }
//         case 'account/convertingCurrency':
//             return {
//                 ...state,
//                 isLoading: true,
//             }
//         default: 
//             return state;
//     }
// }

// export function withdraw (amount) {
//     return { type: ACCOUNT_WITHDRAW, payload: amount }
// }

// export function requestLoan (amount, purpose) {
//     return { 
//         type: ACCOUNT_REQUESTLOAN, 
//         payload: {
//             amount: amount,
//             purpose: purpose
//         }
//     }
// }

// export function payLoan () {
//     return { type: ACCOUNT_PAYLOAN }
// }