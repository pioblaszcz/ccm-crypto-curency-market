export const CHANGE_MENU = 'CHANGE_MENU';
export const SET_PRICES = 'SET_PRICES';

export const changeMenuOpen = (bool) => ({
    type: CHANGE_MENU,
    payload: bool
});

export const setPrices = (prices) => ({
    type: SET_PRICES,
    payload: prices
});