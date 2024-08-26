// src/store/reducers/userReducer.js
const initialState = {
    email: '',
    role: '',
    isLoggedIn: "false"
    // Add other user-related fields if needed
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_ROLE':
            return { ...state, role: action.payload };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
            };
        case 'LOGOUT':
            return initialState; 
        default:
            return state;
    }
};

export default userReducer;
