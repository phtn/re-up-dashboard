"use client";

import { setUID } from "@/app/actions";
import { auth } from "@/lib/firebase/config";
import {
  GithubAuthProvider,
  OAuthCredential,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface AuthCtxValues {
  loading: boolean;
  user: User | null;
  oauth: OAuthCredential | null;
  authenticate: () => Promise<void>;
}
export const AuthCtx = createContext<AuthCtxValues | null>(null);

export const AuthCtxProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [oauth, setOAuth] = useState<OAuthCredential | null>(null);

  const authenticate = useCallback(async () => {
    setLoading(true);
    const provider = new GithubAuthProvider();
    const creds = await signInWithPopup(auth, provider);
    const u = creds?.user;
    if (u) {
      setUser(u);
      await setUID(u.uid);
    }
    const oauthCredential = GithubAuthProvider.credentialFromResult(creds);
    setOAuth(oauthCredential);
    setLoading(false);
  }, []);

  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        return router.push("/");
      }
      // router.push("/dashboard");
    });
    return () => unsub();
  }, [router]);

  const value = useMemo(
    () => ({
      loading,
      user,
      oauth,
      authenticate,
    }),
    [loading, user, oauth, authenticate],
  );
  return <AuthCtx value={value}>{children}</AuthCtx>;
};
