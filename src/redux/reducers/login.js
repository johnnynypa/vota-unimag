const isEmpty = require('lodash/isEmpty');
const {LOGIN} = require('../actions/types');

const initialState = {
    isLogin : false,
    user : {}
};

export default (state = initialState, action = {}) => {
    switch (action.type){
        case LOGIN:
            return {
                isLogin : !isEmpty(action.user),
                user: action.user
            }
        default:
            return state;
    }
};
