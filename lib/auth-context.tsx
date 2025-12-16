"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";

// Define User type based on backend response
interface User {
    id: string;
    email: string;
    name: string;
    email_verified: boolean;
    org_id?: string;
    org_name?: string;
    org_type?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Load user from storage/API on mount
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("access_token");
            if (token) {
                try {
                    // Verify token and get latest user data
                    const response = await apiClient.get("/auth/me");
                    setUser(response.data);
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                    // Token might be invalid
                    localStorage.removeItem("access_token");
                    setUser(null);
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = (token: string, userData: User) => {
        localStorage.setItem("access_token", token);
        setUser(userData);
        router.push("/tenders");
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setUser(null);
        router.push("/login");
    };

    const refreshUser = async () => {
        try {
            const response = await apiClient.get("/auth/me");
            setUser(response.data);
        } catch (error) {
            console.error("Failed to refresh user:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                logout,
                isAuthenticated: !!user,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
