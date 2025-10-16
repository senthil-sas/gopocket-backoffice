export const BASE_URL = 'https://weblive.rmoneyindia.net/cosmos-rest/';
export const WEB_BASE_URL = 'https://weblive.rmoneyindia.net/';

export function AUTH_HEADER () {
    let token = localStorage.getItem('sessionId') ? localStorage.getItem('sessionId') : ''
    let headers = {
        Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
        headers: headers,
    }
    return requestOptions;
}