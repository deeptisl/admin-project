import axios from 'axios';
import { USER_LOGIN, ADD_CORPORATE, ALL_CORPORATE, SINGLE_CORPORATE, UPDATE_CORPORATE } from '../action-types/index';

export function userLogin(credentials) {
    return async dispatch => {
        const headers = { 'Content-Type': 'application/json' };
        return axios
            .post("http://192.81.213.186:9002/admin/validateSuperAdmin", credentials, {
                headers
            })
            .then(response => response.data)
            .then(json => {
                dispatch({ type: USER_LOGIN, payload: json });
            });
    };
}

export function addCorporate(details) {
    return async dispatch => {
        const headers = { 'Content-Type': 'application/json' };
        return axios
            .post("http://192.81.213.186:9002/admin/addCorporate", details, {
                headers
            })
            .then(response => response.data)
            .then(json => {
                console.log('test', json)
                dispatch({ type: ADD_CORPORATE, payload: json });
            });
    };
}


export function updateCorporate(details, id) {
    return async dispatch => {
        const headers = { 'Content-Type': 'application/json' };
        return axios
            .put(`http://192.81.213.186:9002/admin/updateCorporate/${id}`, details, {
                headers
            })
            .then(response => response.data)
            .then(json => {
                console.log(json)
                dispatch({ type: UPDATE_CORPORATE, payload: json });
            });
    };
}


export function allCorporates() {
    return async dispatch => {
        const headers = { 'Content-Type': 'application/json' };
        return axios
            .get("http://192.81.213.186:9002/admin/corporateViewAll", {
                headers
            })
            .then(response => response.data)
            .then(json => {
                dispatch({ type: ALL_CORPORATE, payload: json });
            });
    };
}

export function viewSingleCorporate(id) {
    return async dispatch => {
        const headers = { 'Content-Type': 'application/json' };
        return axios
            .get(`http://192.81.213.186:9002/admin/viewSingleCorporate/${id}`, {
                headers
            })
            .then(response => response.data)
            .then(json => {
                dispatch({ type: SINGLE_CORPORATE, payload: json });
            });
    };
}

export function corporateData(data, actionPerform) {
    let result = {
        data,
        actionPerform
    }
    console.log('onClick',result)
    return dispatch => {
        dispatch({ type: SINGLE_CORPORATE, payload: result });
    };
}

// export function corporateData(data) {
//     return async dispatch => {
//         const headers = { 'Content-Type': 'application/json' };
//         return axios
//             .get(`http://192.81.213.186:9002/admin/viewSingleCorporate/${id}`, {
//                 headers
//             })
//             .then(response => response.data)
//             .then(json => {
//                 dispatch({ type: SINGLE_CORPORATE, payload: json });
//             });
//     };
// }

