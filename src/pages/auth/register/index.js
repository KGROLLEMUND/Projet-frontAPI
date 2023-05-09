import Button from "@/components/UI/Button";
import Button_link from "@/components/UI/Button-link";
import Input from "@/components/UI/Input";
import Loading from "@/components/UI/Loading";
import Notification from "@/components/UI/Notification";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import {useEffect, useState } from "react";
import Title from "@/components/UI/Title";
import Select from "@/components/UI/Select";

const Index = () => {
  const router = useRouter();
  const [Error, setError] = useState(false);

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    isAdmin: "false",
    address: {
      city: "",
      zipCode: "",
      street: "",
    },
    password: "",
    userType: "FREELANCE",
  });

  const { fetchData, data, error, loading } = useFetch({
    url: "/auth/register",
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

  useEffect(() => {
    console.log("data : ", data);
    if (data && data.success) {
      if (userForm.userType === "FREELANCE") {
        router.push("/auth/register/freelance");
      } else if (userForm.userType === "COMPANY") {
        router.push("/auth/register/company");
      }
      localStorage.setItem("token", data.token);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const response = fetchData();
    if (data && data.success) {
      setClickError(false);
      console.log("data : ", data);
      console.log(data.token);
  

    
    } else {
      setError(true);
    }
  };
  if (loading) return <Loading />;
  if (error) {
    error.message = error.message;
  }

  return (
    <>
      <Title title="Inscription" Level="h1" />
      <form onSubmit={handleSubmit}>
        <div styles="row">
          <div styles="col">
            <Input
              name="firstName"
              label="Firstname:"
              type="text"
              placeholder="veuillez saisir votre prénom"
              onChange={handleChange}
              value={userForm.firstName}
              required
            />
            <Input
              name="lastName"
              label="Lastname:"
              type="text"
              placeholder="veuillez saisir votre nom"
              onChange={handleChange}
              value={userForm.lastName}
              required
            />
            <Input
              name="email"
              label="E-mail:"
              type="email"
              placeholder="veuillez saisir votre email"
              onChange={handleChange}
              value={userForm.email}
              required
            />
            <Input
              name="password"
              label="Password:"
              type="password"
              placeholder="veuillez saisir votre password"
              onChange={handleChange}
              value={userForm.password}
              required
            />
            <Input
              name="phone"
              label="Phone:"
              type="text"
              placeholder="veuillez saisir votre phone"
              onChange={handleChange}
              value={userForm.phone}
              required
            />
            <Input
              name="address.city"
              label="City :"
              type="text"
              placeholder="veuillez saisir votre ville"
              onChange={handleChange}
              value={userForm.address.city}
              required
            />
            <Input
              name="address.zipCode"
              label="ZIP Code :"
              type="text"
              placeholder="veuillez saisir votre zip code"
              onChange={handleChange}
              value={userForm.address.zipCode}
              required
            />
            <Input
              name="address.street"
              label="Street :"
              type="text"
              placeholder="veuillez saisir votre address"
              onChange={handleChange}
              value={userForm.address.street}
              required
            />
            <Select
              label="FREELANCE or COMPANY"
              name="userType"
              value={userForm.userType}
              isRequired={true}
              options={[
                { label: "FREELANCE", value: "FREELANCE" },
                { label: "COMPANY", value: "COMPANY" },
              ]}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <Button_link type="button" title="Accueil" className="btn__primary" link="/">
        </Button_link>
        <Button type="submit" title="Suivant" className="btn__primary">
        </Button>
        
      </form>
    </>
  );
};

export default Index;
