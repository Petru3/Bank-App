import { createStore, combineReducers } from 'redux'

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

const initialStateCustomer = {
    fullName: '',
    nationalID: '',
    createdAt: '',
}

const ACCOUNT_DEPOSIT = 'account/deposit'
const ACCOUNT_WITHDRAW = 'account/withdraw'
const ACCOUNT_REQUESTLOAN = 'account/requestLoan'
const ACCOUNT_PAYLOAN = 'account/payLoan'

const CUSTOMER_CREATECUSTOMER = 'customer/createCustomer'
const CUSTOMER_UPDATE_NAME = 'account/updateName'

function accountReducer(state = initialStateAccount, action) {
    switch(action.type){
        case ACCOUNT_DEPOSIT:
            return {
                ...state,
                balance: state.balance + action.payload,
            }
        case ACCOUNT_WITHDRAW:
            return {
                ...state,
                balance: state.balance - action.payload,
            }
        case ACCOUNT_REQUESTLOAN:
            if(state.loan > 0) return state
            return {
                ...state,

                // LATER
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }
        case ACCOUNT_PAYLOAN:
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            }
        default: 
            return state;
    }
}

function customerReducer(state = initialStateCustomer, action) {
    switch(action.type){
        case CUSTOMER_CREATECUSTOMER:
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt
            }
        case CUSTOMER_UPDATE_NAME:
            return {
                ...state,
                fullName : action.payload
            }
        default:
            return state
    }
}


const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

const store = createStore(rootReducer);

// store.dispatch({type: 'account/deposit', payload: 500})

// console.log(store.getState());

// store.dispatch({type: 'account/withdraw', payload: 200})
// console.log(store.getState());

// console.log('Hey Redux!');
// console.log(store.getState());

// store.dispatch({type: 'account/requestLoan', payload: {
//     amount: 1000,
//     purpose: 'Buy groceries',
// }})

// console.log(store.getState());

// store.dispatch({type: 'account/payLoan'})

// console.log(store.getState());


function deposit(amount) {
    return { type: ACCOUNT_DEPOSIT, payload: amount }
}

function withdraw (amount) {
    return { type: ACCOUNT_WITHDRAW, payload: amount }
}

function requestLoan (amount, purpose) {
    return { 
        type: ACCOUNT_REQUESTLOAN, 
        payload: {
            amount: amount,
            purpose: purpose
        }
    }
}

function payLoan () {
    return { type: ACCOUNT_PAYLOAN }
}

// Deposit
store.dispatch(deposit(400));
console.log(store.getState())

// Withdraw
store.dispatch(withdraw(200));
console.log(store.getState())

// Request a Loan
store.dispatch(requestLoan(1000, 'Buy a laptop'));
console.log(store.getState())

// Pay the Loan
store.dispatch(payLoan());
console.log(store.getState())



function createCustomer(fullName, nationalID) {
    return {
        type : CUSTOMER_CREATECUSTOMER,
        payload : {
            fullName, 
            nationalID,
            createdAt: new Date().toISOString(),
        }
    }
}

function updateName(fullName) { 
    return { 
        type: CUSTOMER_UPDATE_NAME,
        payload: fullName
    }
}

// Create Customer
store.dispatch(createCustomer("Jonas Antiaout", "1231232"))
store.dispatch(deposit(150));
console.log(store.getState());

// Update Name
store.dispatch(updateName('Morgan Tinisee'));
console.log(store.getState());