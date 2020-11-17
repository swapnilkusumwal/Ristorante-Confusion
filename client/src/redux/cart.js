import * as ActionTypes from './ActionTypes';

export const cart = (state = {
        isLoading: true,
        errMess: null,
        cart: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_CART:
            return {...state, isLoading: false, errMess: null, cart: action.payload};

        case ActionTypes.CART_LOADING:
            return {...state, isLoading: true, errMess: null, cart: null};

        case ActionTypes.CART_FAILED:
            return {...state, isLoading: false, errMess: action.payload, cart: null};

        default:
            return state;
    }
}