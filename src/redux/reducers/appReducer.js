import {
    CHANGE_MENU,
    SET_PRICES
} from '../actions/appActions';


const initialState = {
    isMenuOpen: false,
    coinsPrices: null,
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_MENU:
            return {
                ...state,
                isMenuOpen: action.payload
            };
        case SET_PRICES:
            return {
                ...state,
                coinsPrices: action.payload
            };
        default:
            return state;
    }
}