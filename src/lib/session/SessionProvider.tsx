"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { LoginParams, SessionProfile } from '@/lib/session/types';

type SessionContextType = {
  name: string | null;
  title: string | null;
  login: (params: LoginParams) => Promise<SessionProfile | null>;
  logout: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType>({
  name: null,
  title: null,
  login: async () => null,
  logout: async () => {},
});

export const SessionProvider = ({ children }: { children: ReactNode }): any => {
  const [profile, setProfile] = useState<SessionProfile | null>(null);

  useEffect(() => {
    const fetchSessionProfile = async () => {
      try {
        const result = await fetch('/api/session');
        if (!result.ok) {
          throw new Error('Failed to fetch session data');
        }

        const sessionProfile: SessionProfile = await result.json();
        console.log('Loaded profile', sessionProfile);
        setProfile(sessionProfile);
      } catch (error) {
        console.error('Error loading session', error);
        setProfile(null);
        // Handle error // HTTP 404 // auto logout?
      }
    };

    fetchSessionProfile();
  }, []);

  const login = useCallback(async ({name, title}: LoginParams) => {
    try {
      const result = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, title})
      });
      const sessionProfile = await result.json();
      console.log('Logged in', sessionProfile);
      setProfile(sessionProfile);
      return sessionProfile;

    } catch (error) {
      console.error('Error logging in', error);
      // Handle error
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      });
      console.log('Logged out');
      setProfile(null);

    } catch (error) {
      console.error('Error Logging out', error);
      // Handle error
    }
  }, []);

  const providerValues = { name: profile?.name ?? null, title: profile?.title ?? null, login, logout };
  return (
    <SessionContext.Provider value={providerValues}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
