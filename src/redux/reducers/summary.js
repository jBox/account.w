import { combineReducers } from 'redux';

export const filters = (state = { date: "2016" }, action) => {
    return state;
}

export default combineReducers({
    filters
});