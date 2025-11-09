"use client";

import { useEffect } from "react";
import { useStore } from "./StoreContext";

/**
 * InitUser — hanya untuk testing role-based Sidebar.
 * Nanti akan diganti oleh data login asli.
 */
export default function InitUser() {
    const { dispatch } = useStore();

    useEffect(() => {
        // 🔧 Simulasi login superadmin
        dispatch({
            type: "SET_USER",
            payload: {
                id: 1,
                name: "Admin",
                email: "admin@example.com",
                role: "superadmin",
            },
        });
    }, [dispatch]);

    return null;
}
