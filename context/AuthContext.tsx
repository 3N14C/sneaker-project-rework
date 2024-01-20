import { ILoginDto } from "./dto/login.dto";
import { ISignupDto } from "./dto/signup.dto";
import { account, ID } from "../appwrite/appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/auth/user.interface";

interface IUserState {
  user: { name: string; email: string; id: string } | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: (dto: ILoginDto) => Promise<void>;
  signup: (dto: ISignupDto) => Promise<void>;
}

const defaultState: IUserState = {
  user: null,
  loading: true,
  logout: async () => {},
  login: async () => {},
  signup: async () => {},
};

const AuthContext = createContext<IUserState>(defaultState);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { $id, name, email } = await account.get();
        setUser({ id: $id, name, email });
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (dto: ILoginDto) => {
    try {
      await account.createEmailSession(dto.email, dto.password);
      const { $id, name, email } = await account.get();
      setUser({ id: $id, name, email });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (dto: ISignupDto) => {
    try {
      await account.create(ID.unique(), dto.email, dto.password, dto.name);
      await login({ email: dto.email, password: dto.password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
