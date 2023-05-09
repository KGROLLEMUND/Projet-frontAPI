import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button/";
import Title from "@/components/UI/Title";
import Loading from "@/components/UI/Loading";
import Notification from "@/components/UI/Notification";
import UserContext from "@/context/UserContext";

const Index = () => {
  const router = useRouter();
  const { login } = useContext(UserContext);
  const [token, setToken] = useState();
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });

  const { fetchData, data, error, loading } = useFetch({
    url: "/auth/login",
    method: "POST",
    body: userForm,
    token: null,
  });

  useEffect(() => {
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.isAdmin) {
        router.push("/");
      }
      router.push("/");
    }
  }, [data]);

  const submitLogin = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Loading isLoad={loading} />
      <Title title="Login" Level="h1" />
      <form onSubmit={(e) => submitLogin(e)}>
        <Input
          label="Email"
          name="email"
          placeholder="veuillez saisir votre email"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="veuillez saisir votre mot de passe"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm.password}
        />
        <Button type="submit" title="Se connecter" className="btn__primary" />
      </form>
      {error && <Notification type="warning" message={error.message} />}
      <p>
        Vous n'avez pas de compte ?{" "}
        <Link href="/auth/register">Inscrivez-vous ici</Link>
      </p>
      <p>
        Mot de passe oublié ?{" "}
        <Link href="/auth/forgot-password">Cliquez ici</Link>
      </p>
    </>
  );
};

export default Index;
