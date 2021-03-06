import getRemoteMeteor from "../services/meteor/methods";

export const  LOAD_MONEY_PAGE = "LOAD_MONEY_PAGE";
export const  EXPECT_LOAD_MONEY_PAGE = "LOAD_MONEY_PAGE";
export const  LOAD_MONEY_PAGE_FAIL = "LOAD_MONEY_PAGE";
export const  LOAD_MONEY_PAGE_SUCCESS = "LOAD_MONEY_PAGE";


export function expectLoadMoneyPage(){
    return {
        type: EXPECT_LOAD_MONEY_PAGE,
    }
}
export function loadMoneyPageFail(reason){
    return {
        type: LOAD_MONEY_PAGE_FAIL,
        reason
    }
}
export function loadMoneyPageSuccess(msg){
    return {
        type: LOAD_MONEY_PAGE_SUCCESS,
        msg,
    }
}
export function loadMoneyPage(userId){
    return (dispatch, getState) => {
        dispatch(expectLoadMoneyPage());
        return getRemoteMeteor(dispatch, getState, 'balances', "app.load.money.page",
    [userId], loadMoneyPageSuccess, loadMoneyPageFail);
    }
}


export const EXPECT_WITHDRAW_MONEY = "WITHDRAW_MONEY";
export const WITHDRAW_MONEY_FAIL = "WITHDRAW_MONEY";
export const WITHDRAW_MONEY_SUCCESS = "WITHDRAW_MONEY";
export const WITHDRAW_MONEY = "WITHDRAW_MONEY";


export function expectWithdrawMoney(){
    return {
        type: EXPECT_WITHDRAW_MONEY
    }
}
export function withdrawMoneyFail(reason){
    return {
        type: WITHDRAW_MONEY_FAIL,
        reason,
    }
}
export function withdrawMoneySuccess(msg){
    return {
        type: WITHDRAW_MONEY_SUCCESS,
        msg
    }
}
export function withdrawMoney(userId, amount, bankId){
    return (dispatch, getState)=>{
        dispatch(expectWithdrawMoney());
        return getRemoteMeteor(dispatch, getState, "balances", 'app.withdraw.money',
    [userId, amount, bankId], withdrawMoneySuccess, withdrawMoneyFail);
    }
}


export const EXPECT_GET_USER_BANKCARDS = "GET_USER_BANKCARDS";
export const GET_USER_BANKCARDS_FAIL = "GET_USER_BANKCARDS";
export const GET_USER_BANKCARDS_SUCCESS = "GET_USER_BANKCARDS";
export const GET_USER_BANKCARDS = "GET_USER_BANKCARDS";


export function expectGetUserBankCards(){
    return {
        type: EXPECT_GET_USER_BANKCARDS
    }
}
export function getUserBankCardsFail(reason){
    return {
        type: GET_USER_BANKCARDS_FAIL,
        reason
    }
}
export function getUserBankCardsSuccess(msg){
    return {
        type: GET_USER_BANKCARDS_SUCCESS,
        msg
    }
}
export function getUserBankCards(userId){
    return (dispatch, getState) => {
        dispatch(expectGetUserBankCards());
        return getRemoteMeteor(dispatch, getState, "balances", 'app.get.user.bankcards', [userId],
    getUserBankCardsSuccess, getUserBankCardsFail);
    }
}

export const USER_CREATE_BANKCARD = "USER_CREAT_BANKCARD";
export const EXPECT_USER_CREATE_BANKCARD = "USER_CREAT_BANKCARD";
export const USER_CREATE_BANKCARD_FAIL = "USER_CREAT_BANKCARD";
export const USER_CREATE_BANKCARD_SUCCESS = "USER_CREAT_BANKCARD";


export function expectUserCreateBankcard(){
    return {
        type: EXPECT_USER_CREATE_BANKCARD,
    }
}

export function userCreateBankcardFail(reason){
    return {
        type: USER_CREATE_BANKCARD_FAIL,
        reason
    }
}


export function userCreateBankcardSuccess(msg){
    return {
        type: USER_CREATE_BANKCARD_SUCCESS,
        msg
    }
}

export function userCreateBankcard(userId, realName, accountNumber, bankAddress){
    return (dispatch, getState) => {
        dispatch(expectUserCreateBankcard());
        return getRemoteMeteor(dispatch, getState, "bankcards",
    'app.user.create.bankcard', [userId, realName, accountNumber, bankAddress],
userCreateBankcardSuccess, userCreateBankcardFail);
    }
}

