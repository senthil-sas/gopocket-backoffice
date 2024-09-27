export const BASE_URL = 'https://ekyc.gopocket.in/cosmos-rest/cosmos/';

export function AUTH_HEADER () {
    let token = localStorage.getItem('sessionId') ? localStorage.getItem('sessionId') : ''
    let headers = {
        Authorization: `Bearer ${token}`,
    };
    return headers;
}