import { combineReducers } from 'redux';
import {
    QUERY_PROJECTS_REQUEST,
    QUERY_PROJECTS_SUCCESS
} from '../actions';
import summary from './summary';

const projects = (state = {}, action) => {
    switch (action.type) {
        case QUERY_PROJECTS_SUCCESS:
            return Object.assign({}, state, { [action.date]: action.payload });
        default:
            return state;
    }
}

const queryStatus = (state = {}, action) => {
    switch (action.type) {
        case QUERY_PROJECTS_REQUEST:
            return Object.assign({}, state, { projects: "request" });
        case QUERY_PROJECTS_SUCCESS:
            return Object.assign({}, state, { projects: "success" });
        default:
            return state;
    }
}

export default combineReducers({
    summary,
    projects,
    queryStatus
});