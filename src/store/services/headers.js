const authHeaderWeb = () => {
    let token = localStorage.getItem('sessionId') ? localStorage.getItem('sessionId') : ''
    let headers = {
        'Authorization': `Bearer ${token}`,
    };
    return headers;
}

export { authHeaderWeb }