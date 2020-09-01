import React, { useReducer, createContext } from "react";
import { LOGIN, LOGOUT } from "./Types";
import jwtDecode from "jwt-decode";

const initialState = {
    user: null,
};

const token = localStorage.getItem("JWTTOKEN");

if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("JWTTOKEN");
    } else {
        initialState.user = decodedToken;
    }
}

export const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {},
});

const authReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN:
            return {
                ...state,
                user: payload,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData) => {
        localStorage.setItem("JWTTOKEN", userData.token);
        dispatch({ type: LOGIN, payload: userData });
    };

    const logout = () => {
        localStorage.removeItem("JWTTOKEN");
        dispatch({ type: LOGOUT });
    };

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
};
