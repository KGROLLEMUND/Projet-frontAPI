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
  console.log("user : ", user.firstName);
  const [token, setToken] = useState();
  const [clickError, setClickError] = useState(false);

  const [userForm, setUserForm] = useState({
    yearOfExperience: "",

    user: user.firstName,
  });

  const { data, error, loading, fetchData } = useFetch({
    url: "/api/v1/auth/freelance",
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
      router.push("/auth/register");
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
    console.log("user : ", userForm);
  };

  const submitRegister = (e) => {
    e.preventDefault();
    fetchData();
    console.log(userForm);
    if (data.success) {
      setClickError(false);
      console.log("data : ", data);
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      setClickError(true);
    }
  };

  return (
    <>
      <Title title="Company" Level="h1" />
      <form onSubmit={(e) => submitRegister(e)}>
        <Select
          label="Expérience d'âge"
          name="yearOfExperience"
          value={userForm.yearOfExperience}
          isRequired={true}
          options={[
            { label: "1 an", value: 1 },
            { label: "2 ans", value: 2 },
            { label: "3 ans", value: 3 },
            { label: "4 ans", value: 4 },
            { label: "5 ans", value: 5 },
            { label: "6 ans", value: 6 },
            { label: "7 ans", value: 7 },
            { label: "8 ans", value: 8 },
            { label: "9 ans", value: 9 },
            { label: "10 ans", value: 10 },
          ]}
          onChange={(e) => handleChange(e)}
        />

        <Button
          type="submit"
          title="S'inscrire"
          btn="btn"
          className="btn__secondary"
          handleClick={(e) => submitRegister(e)}
        />
      </form>
      {clickError && (
        <Notification
          type="warning"
          message="Champs manquant ou incorrect"
        />
      )}
    </>
  );
};

export default Index;
