import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";

const UserContext = createContext({
  isLogged: false,
  user: {},
});

export default UserContext;

export const UserContextProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [token, setToken] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { data, error, loading, fetchData } = useFetch({
    url: "/user",
    method: "GET",
    body: null,
    token: token,
  });


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isLogged) {
      setToken(token);
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (isLogged){
      if (user.isAdmin ) {
        router.push("/admin")
      }else if (!user.isAdmin) {
        router.push("/")
      }
    }
  }, [user, router])

  useEffect(() => {
    if (data && data.success) {
      login(data);
    }
  }, [data]);

  const login = (data) => {
    if (data.isAdmin) {
      setIsAdmin(true)
    }
    setUser(data);
    setIsLogged(true);
  };

  const logout = () => {
    setIsLogged(false);
    setUser({});
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const updateUser = (data) => {
    setUser(data);
  };

  const fetchUser = () => {
    fetchData();
  }

  const context = {
    login,
    logout,
    user,
    isLogged,
    updateUser,
    fetchUser,
    isAdmin,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};