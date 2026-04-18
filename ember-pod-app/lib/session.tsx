import { Session, User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from './supabase';

type SessionContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value: SessionContextValue = {
    session,
    user: session?.user ?? null,
    loading,
    signOut: async () => {
      await supabase.auth.signOut();
    },
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  return useContext(SessionContext);
}
