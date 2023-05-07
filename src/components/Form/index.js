import { useState } from "react";
import Input from "@/components/UI/Input";
import useFetch from "@/hooks/useFetch";
import Title from "@/components/UI/Title";
import Button from "@/components/UI/Button";
import Notification from "@/components/UI/Notification";
import { useRouter } from "next/router";
import Loading from "@/components/UI/Loading";
import Select from "@/components/UI/Select";
import styles from "./index.module.scss";
const Index = () => {
  const router = useRouter();

  const [clickError, setClickError] = useState(false);
  
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    isAdmin: "false",
    address: {
      street: "",
      zipCode: "",
      city: "",
    },
    password: "",
    userType: "Freelance",
  });

  const { fetchData, data, error, loading } = useFetch({
    url: "/api/v1/auth/register",
    method: "POST",
    body: userForm,
    token: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userType") {
      setUserForm({
        ...userForm,
        [name]: value === "FREELANCE" ? "FREELANCE" : "COMPANY",
      });
    } else if (name.startsWith("address.")) {
      setUserForm({
        ...userForm,
        address: {
          ...userForm.address,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setUserForm({
        ...userForm,
        [name]: value,
      });
    }
    console.log("user : ", userForm);
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    await fetchData();
    console.log(userForm);

    if (data.success) {
      setClickError(false);
      console.log("data : ", data);
      console.log(data.token);
      localStorage.setItem("token", data.token);
      if (userForm.userType === "FREELANCE") {
        router.push("register/freelance");
      } else if (userForm.userType === "COMPANY") {
        console.log(data.token);
        router.push("register/company");
      }
    } else {
      setClickError(true);
    }
  };
  if (loading) return <Loading />;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.form__wrapper}>
          <Title title="Inscription" Level="h1" />
          <form onSubmit={(e) => submitRegister(e)}>
            <Input
              label="Firstname"
              type="firstName"
              name="firstName"
              placeholder="Veuillez saisir votre prénom"
              required={true}
              onChange={(e) => handleChange(e)}
              value={userForm.firstName}
            />

            <Input
              label="Lastname"
              type="lastName"
              name="lastName"
              placeholder="Veuillez saisir votre nom"
              required={true}
              onChange={(e) => handleChange(e)}
              value={userForm.lastName}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Veuillez saisir votre email"
              required={true}
              onChange={(e) => handleChange(e)}
              value={userForm.email}
              autoComplete="username"
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Veuillez saisir votre mot de passe"
              isRequired={true}
              onChange={(e) => handleChange(e)}
              value={userForm.password}
              autocomplete="current-password"
            />
            <Input
              label="Phone"
              type="phone"
              name="phone"
              placeholder="Veuillez saisir votre téléphone"
              required={true}
              onChange={(e) => handleChange(e)}
              value={userForm.phone}
            />
            <Input
              label="City"
              type="text"
              name="address.city"
              placeholder="Veuillez saisir votre ville"
              required={true}
              onChange={(e) => handleChange(e)}
              value={userForm.address.city}
            />
            <Input
              label="Address"
              type="text"
              name="address.street"
              placeholder="Veuillez saisir votre address"
              required={true}
              onChange={(e) => handleChange(e)}
              value={userForm.address.street}
            />

            <Input
              label="Zip Code"
              type="text"
              name="address.zipCode"
              placeholder="Veuillez saisir votre zip code"
              required={true}
              onChange={(e) => handleChange(e)}
              value={userForm.address.zipCode}
            />

            
            <Select
              label="Type d'utilisateur"
              name="userType"
              value={userForm.userType}
              isRequired={true}
              options={[
                { label: "Freelance", value: "FREELANCE" },
                { label: "Company", value: "COMPANY" },
              ]}
              onChange={(e) => handleChange(e)}
            />

            <Button
              type="submit"
              title="Suivant"
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
        </div>
      </div>
    </>
  );
};

export default Index;
