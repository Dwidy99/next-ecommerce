"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

/* ===== TYPES ===== */
interface User {
    id?: number;
    name?: string;
    email?: string;
    role?: "superadmin" | "customer";
}

interface AuthState {
    user: User | null;
    loading: boolean;
}

type AuthAction =
    | { type: "SET_USER"; payload: User | null }
    | { type: "SET_LOADING"; payload: boolean };

interface StoreContextType {
    authState: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}

/* ===== REDUCER ===== */
function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}

/* ===== CONTEXT ===== */
const StoreContext = createContext<StoreContextType | undefined>(undefined);

const initialAuthState: AuthState = {
    user: null,
    loading: false,
};

export function StoreProvider({ children }: { children: ReactNode }) {
    const [authState, dispatch] = useReducer(authReducer, initialAuthState);

    return (
        <StoreContext.Provider value= {{ authState, dispatch }
}>
    { children }
    </StoreContext.Provider>
  );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
}
