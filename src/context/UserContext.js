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

  const { data, error, loading, fetchData } = useFetch({
    url: "/api/v1/user",
    method: "GET",
    body: null,
    token: token,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token userConx : ", token);
    console.log("isLogged : ", isLogged);
    if (token && !isLogged) {
      setToken(token);
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (data && data.success) {
      login(data.user);
    }
  }, [data]);

  const login = (data) => {
    setUser(data);
    setIsLogged(true);
  };

  const logout = () => {
    setIsLogged(false);
    setUser({});
    localStorage.removeItem("token");
    router.push("/");
  };
  const updateUser = (data) => {
    setUser(data);
  };

  const context = {
    login,
    logout,
    user,
    isLogged,
    updateUser,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};