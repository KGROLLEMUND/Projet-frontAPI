import { useEffect, useState, useContext } from "react";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Select from "@/components/UI/Select";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Loading from "@/components/UI/Loading";
import Title from "@/components/UI/Title";
import Notification from "@/components/UI/Notification";

const Index = () => {
  const router = useRouter();
  const { isLogged, user, updateUser } = useContext(UserContext);
  const [token, setToken] = useState();
  const [Error, setError] = useState(false);

  const [userForm, setUserForm] = useState({
    yearOfExperience: "",
    rate: "",
    user: user.firstName,
  });

  const { data, error, loading, fetchData } = useFetch({
    url: "/auth/freelance",
    method: "POST",
    body: userForm,
    token: token,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token : ", localStorage.getItem("token"));
    if (token) {
      setToken(token);
    } else {
      console.log("error");
    }
  }, []);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") {
      setUserForm({
        ...userForm,
        status: value,
      });
    } else {
      setUserForm({
        ...userForm,
        [name]: value,
      });
    }
  };

  const submitRegister = (e) => {
    e.preventDefault();
    fetchData();
    if (data.success) {
      setError(false);
      console.log("data : ", data);
      router.push("/");
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Title title="Freelance" Level="h1" />
      <form onSubmit={(e) => submitRegister(e)}>
        <Input
          label="Années d'expérience"
          name="yearOfExperience"
          value={userForm.yearOfExperience}
          required
          type="text"
          placeholder="Combien vous avez d'année d'experience"
          onChange={handleChange}
        />
        <Input
          label="Rate"
          name="rate"
          required
          value={userForm.rate}
          type="text"
          placeholder="veuillez saisir votre rémunération"
          onChange={handleChange}
        />

        <Button
          type="submit"
          title="S'inscrire"
          btn="btn"
          className="btn__secondary"
          handle={(e) => submitRegister(e)}
        />
      </form>
      {Error && (
        <Notification
          type="warning"
          message="Champs manquant ou incorrect"
        />
      )}
    </>
  );
};

export default Index;
