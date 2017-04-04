import samples from '../../common/samples';

export const QUERY_PROJECTS_REQUEST = "QUERY_PROJECTS_REQUEST";
export const QUERY_PROJECTS_SUCCESS = "QUERY_PROJECTS_SUCCESS";

export const getProjectsByDate = (date) => {
    return (dispatch, getState) => {
        dispatch({ type: QUERY_PROJECTS_REQUEST, date });
        return Promise.resolve(dispatch({ type: QUERY_PROJECTS_SUCCESS, date, payload: samples }));
    }
}