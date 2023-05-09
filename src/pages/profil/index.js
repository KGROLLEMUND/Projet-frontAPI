import { useEffect, useState, useContext } from "react";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import Loading from "@/components/UI/Loading";
import Title from "@/components/UI/Title";
import styles from "./index.module.scss";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
const Index = () => {
  const { isLogged, user, updateUser } = useContext(UserContext);
  const [token, setToken] = useState();
  const [userForm, setUserForm] = useState();
  const [showModal, setShowModal] = useState(false);
  const {
    data: dataUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
    fetchData: fetchDataUpdate,
  } = useFetch({
    url: "/user",
    method: "PUT",
    body: userForm,
    token: token,
  });

  // const {
  //   data: dataUpdatefreelance,
  //   error: errorUpdatefreelance,
  //   loading: loadingUpdatefreelance,
  //   fetchData: fetchDataUpdatefreelance,
  // } = useFetch({
  //   url: "/freelance",
  //   method: "PUT",
  //   body: userForm?.freelance,
  //   token: token,
  // });

  // const {
  //   data: dataUpdatecompany,
  //   error: errorUpdatecompany,
  //   loading: loadingUpdatecompany,
  //   fetchData: fetchDataUpdatecompany,
  // } = useFetch({
  //   url: "/company",
  //   method: "PUT",
  //   body: userForm?.company,
  //   token: token,
  // });

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // useEffect(() => {
  //   if (token && !isLogged) {
  //     fetchData();
  //   }
  // }, [token, isLogged]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token : ", localStorage.getItem("token"));
    if (token) {
      setToken(token);
    } else {
      router.push("/auth/register");
    }
  }, []);

  useEffect(() => {
    setUserForm(user);
  }, [user]);

  useEffect(() => {
    if (dataUpdate.success) {
      setShowModal(false);
      updateUser(dataUpdate.user);
    }
  }, [dataUpdate]);

  if (loadingUpdate) return;
  <Loading />;
  if (errorUpdate) console.log(errorUpdate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      setUserForm({
        ...userForm,
        address: {
          ...userForm.address,
          [name.split(".")[1]]: value,
        },
      });
    } else if (name.startsWith("freelance.")) {
      setUserForm({
        ...userForm,
        freelance: {
          ...userForm.freelance,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setUserForm({
        ...userForm,
        [name]: value,
      });
    }
    if (e.target.name.split(".")[0] == "company") {
      if (e.target.name.split(".")[1] == "address") {
        setForm({
          ...form,
          company: {
            ...form.company,
            address: {
              ...form.company.address,
              [e.target.name.split(".")[2]]: e.target.value,
            },
          },
        });
      } else {
        setForm({
          ...form,
          company: {
            ...form.company,
            [e.target.name.split(".")[1]]: e.target.value,
          },
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preDefault();
    if (e.target.name == "submit") {
      const token = localStorage.getItem("token");
      setToken(token);
      fetchDataUpdate();
      if (form.freelance) freelanceUpdate.fetchData();
      if (form.company) companyUpdate.fetchData();
      if (dataUpdate.success) {
        setShowModal(false);
      }
    }
  };


  return (
    console.log("user : ", user),
    console.log("getUserType : ", user.userType),
    <>
      <div className={styles.modal}>
        {showModal && (
          <Modal onClose={handleCloseModal}>
            <Title title="Modifier profil" Level="h1" />
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className={styles.flexContainer}>
                <Input
                  label="firstName"
                  type="text"
                  name="firstName"
                  value={userForm.firstName}
                  required
                  placeholder="Modifier votre firstName"
                  onChange={handleChange}
                />
                <Input
                  label="lastName"
                  type="text"
                  name="lastName"
                  value={userForm.lastName}
                  required
                  placeholder="Modifier votre lastName"
                  onChange={handleChange}
                />
                <Input
                label="email"
                type="text"
                name="email"
                value={userForm.email}
                required
                placeholder="Modifier votre email"
                onChange={handleChange}
              />
              <Input
                label="phone"
                type="text"
                name="phone"
                value={userForm.phone}
                required
                placeholder="Modifier votre phone"
                onChange={handleChange}
              />
              <Input
                label="City"
                type="text"
                name="address.city"
                placeholder="Modifier votre ville"
                required
                onChange={handleChange}
                value={userForm.address.city}
              />
              <Input
                label="Street"
                type="text"
                name="address.street"
                placeholder="Modifier votre address"
                required
                onChange={handleChange}
                value={userForm.address.street}
              />
              <Input
                label="Zip Code"
                type="text"
                name="address.zipCode"
                placeholder="Modifier votre zip code"
                required
                onChange={handleChange}
                value={userForm.address.zipCode}
              />
              {user && user.userType == "FREELANCE" && (
                <>
                  <Input
                    label="Rate"
                    type="text"
                    name="freelance.rate"
                    placeholder="Modifier votre rate"
                    required
                    onChange={handleChange}
                    value={userForm.freelance.rate}
                  />

                  <Input
                    label="Year of Experience"
                    type="text"
                    name="freelance.yearOfExperience"
                    placeholder="Modifier votre année d'experience"
                    required
                    onChange={handleChange}
                    value={userForm.freelance.yearOfExperience}
                  />
                </>
              )}
              {user.userType == "COMPANY" && (
                <>
                  <Input
                    name="company.name"
                    label="Name:"
                    type="text"
                    onChange={handleChange}
                    placeholder="Modifier votre nom de company"
                    value={userForm.company.name}
                    required
                  />
                  <Select
                    name="company.status"
                    label="Status:"
                    options={["SAS", "SASU", "SARL", "EURL", "SA"]}
                    onChange={handleChange}
                    placeholder="Modifier votre status de company"
                    value={userForm.company.status}
                    required
                  />
                  <Input
                    name="company.siret"
                    label="SIRET:"
                    type="text"
                    onChange={handleChange}
                    placeholder="Modifier votre siret"
                    value={userForm.company.siret}
                    required
                  />
                  <Input
                    name="company.address.city"
                    label="City:"
                    type="text"
                    placeholder="Modifier votre ville"
                    onChange={handleChange}
                    value={userForm.company.address.city}
                    required
                  />
                  <Input
                    name="company.address.zipCode"
                    label="ZIP Code:"
                    type="text"
                    placeholder="Modifier votre zip code"
                    onChange={handleChange}
                    value={userForm.company.address.zipCode}
                    required
                  />
                  <Input
                    name="company.address.street"
                    label="Street:"
                    type="text"
                    placeholder="Modifier votre address"
                    onChange={handleChange}
                    value={userForm.company.address.street}
                    required
                  />
                  </>
                )}
              </div>
              
            
              <Button type="submit" title="modifier" className="btn__primary" />
            </form>
          </Modal>
        )}

        {user &&  (
            <>
              <div className={styles.center}>
                <p className={styles.flexItem}>
                  Vous êtes un <span> {user.userType}</span>
                </p>
                <div className={styles.flexContainer}>
                  <p className={styles.flexItem}>
                    Nom : <span> {user.lastName}</span>
                  </p>
                  <p className={styles.flexItem}>
                    Prénom : <span> {user.firstName}</span>
                  </p>
                  <p className={styles.flexItem}>
                    Email : <span> {user.email}</span>
                  </p>
                  <p className={styles.flexItem}>
                    Phone : <span> {user.phone}</span>
                  </p>
                  <p className={styles.flexItem}>
                    Address : <span> {user.address?.street}</span>
                  </p>
                  <p className={styles.flexItem}>
                    Zip code : <span> {user.address?.zipCode}</span>
                  </p>
                  <p className={styles.flexItem}>
                    Ville : <span> {user.address?.city}</span>
                  </p>
                  {user.userType == "FREELANCE" && (
                    <>
                      <p className={styles.flexItem}>
                        Rate : <span> {user.freelance?.rate} </span>
                      </p>
                      <p className={styles.flexItem}>
                        Année d'experience :{" "}
                        <span> {user.freelance?.yearOfExperience} </span>
                      </p>
                    </>
                  )}
                  {user.userType == "COMPANY" && (
                    <>
                      <p className={styles.flexItem}>
                        Nom : <span> {user.company?.name} </span>
                      </p>
                      <p className={styles.flexItem}>
                        Status : <span> {user.company?.status} </span>
                      </p>
                      <p className={styles.flexItem}>
                        Siret: <span> {user.company?.siret} </span>
                      </p>
                      <p className={styles.flexItem}>
                        Ville : <span> {user.company?.address.city} </span>
                      </p>
                      <p className={styles.flexItem}>
                        Address : <span> {user.company?.address.street} </span>
                      </p>
                      <p className={styles.flexItem}>
                        Zip code :{" "}
                        <span> {user.company?.address.zipCode} </span>
                      </p>
                    </>
                  )}
                  <Button
                    title="modifier"
                    className="btn__primary"
                    type="button"
                    handleClick={handleButtonClick}
                  />
                </div>
              </div>
            </>
          )}
      </div>
    </>
  );
};

export default Index;
