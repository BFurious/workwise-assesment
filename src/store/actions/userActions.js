// src/store/actions/userActions.js
export const setEmail = (email) => ({
    type: 'SET_EMAIL',
    payload: email,
});

export const setRole = (role) => ({
    type: 'SET_ROLE',
    payload: role,
});

export const logout = () => {
    return {
        type: 'LOGOUT',
    };
};

export const setLogIn = (loginPayload) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: loginPayload
    };
};