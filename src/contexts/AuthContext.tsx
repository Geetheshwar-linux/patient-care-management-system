import React, { createContext, useState, useContext, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'; // Import createClient from Supabase

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'caretaker' | 'family' | 'superuser'; // Added superuser role
};

const SUPABASE_URL = 'your_supabase_url'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'your_supabase_anon_key'; // Replace with your Supabase anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); // Initialize Supabase client

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  testLogin: () => Promise<void>; // Added testLogin to the type
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: '2', name: 'John Doe', email: 'caretaker@example.com', password: 'care123', role: 'caretaker' },
  { id: '3', name: 'Family Member', email: 'family@example.com', password: 'family123', role: 'family' },
  { id: '4', name: 'Super User', email: 'superuser@example.com', password: 'super123', role: 'superuser' }, // Added super user for testing
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase
      .from('users') // Assuming you have a 'users' table in Supabase
      .select('*')
      .eq('email', email)
      .eq('password', password); // Note: Password should be hashed in a real application

    if (error || data.length === 0) {
      throw new Error('Invalid credentials');
    }

    const foundUser = data[0]; // Get the first user from the result

    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = foundUser; // This line is fine as it removes the password
    setUser(userWithoutPassword as User);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Temporary login test function
  const testLogin = async () => {
    await login('admin@example.com', 'admin123');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, testLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
