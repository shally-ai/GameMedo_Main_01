import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkAdmin(currentUser);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkAdmin(currentUser);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdmin = (currentUser: User | null) => {
    if (currentUser) {
      const adminEmails = import.meta.env.VITE_ADMIN_EMAIL?.split(",").map((e: string) => e.trim()) || [];
      const isUserAdmin = adminEmails.includes(currentUser.email || "");
      setIsAdmin(isUserAdmin);
    } else {
      setIsAdmin(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast({ title: "Logged out", description: "You have been safely signed out." });
    } catch (error) {
      console.error("Logout error:", error);
      toast({ title: "Error signing out", variant: "destructive" });
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("Google Login Error:", error);
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      toast({ title: "Reset Email Sent", description: "Check your inbox for further instructions." });
    } catch (error: any) {
      console.error("Reset Password Error:", error);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, logout, loginWithGoogle, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
