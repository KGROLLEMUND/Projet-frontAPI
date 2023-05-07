import { useEffect, useState, useContext } from "react";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Select from "@/components/UI/Select";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Loading from "@/components/UI/Loading";
import Title from "@/components/UI/Title";

const Index = () => {
  const router = useRouter();
  const { isLogged, user, updateUser } = useContext(UserContext);

  const [token, setToken] = useState();

  const [userForm, setUserForm] = useState({
    name: "",
    status: "SASU",
    siret: "",
    address: {
      street: "",
      zipCode: "",
      city: "",
    },
  });

  const { data, error, loading, fetchData } = useFetch({
    url: "/api/v1/auth/company",
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

  const submitRegister = (e) => {
    e.preventDefault();
    fetchData();
    console.log(userForm);
    if (data) {
      console.log("data : ", data);
      localStorage.setItem("token", data.token);
    }
  };

  return (
    <>
      <Title title="Company" Level="h1" />
      <form onSubmit={(e) => submitRegister(e)}>
        <Input
          label="Name"
          type="name"
          name="name"
          placeholder="veuillez saisir le nom de votre entreprise"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.name}
        />
        <Select
          label="Status"
          name="status"
          value={userForm.status}
          isRequired={true}
          options={[
            { label: "SASU", value: "SASU" },
            { label: "SARL", value: "SARL" },
            { label: "EURL", value: "EURL" },
            { label: "SAS", value: "SAS" },
            { label: "SA", value: "SA" },
          ]}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="Siret"
          type="siret"
          name="siret"
          placeholder="veuillez saisir le numéro de siret"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.siret}
        />

        <Input
          label="Street"
          type="text"
          name="address.street"
          placeholder="Enter your street address"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.address.street}
        />

        <Input
          label="Zip Code"
          type="text"
          name="address.zipCode"
          placeholder="Enter your zip code"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.address.zipCode}
        />

        <Input
          label="City"
          type="text"
          name="address.city"
          placeholder="Enter your city"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.address.city}
        />
        <Button
          type="submit"
          title="S'inscrire"
          btn="btn"
          className="btn__secondary"
          handleClick={(e) => submitRegister(e)}
        />
        {clickError && (
          <Notification type="warning" message="Champs manquant ou incorrect" />
        )}
      </form>
    </>
  );
};

export default Index;
