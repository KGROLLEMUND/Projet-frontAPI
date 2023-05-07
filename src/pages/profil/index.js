import { useEffect, useState, useContext } from "react";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import Loading from "@/components/UI/Loading";
import Title from "@/components/UI/Title";
import styles from "./index.module.scss";
const Index = () => {
  const { isLogged, user, updateUser } = useContext(UserContext);

  const [token, setToken] = useState();

  const [userForm, setUserForm] = useState();

  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
    console.log(showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const {
    data: dataUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
    fetchData: fetchDataUpdate,
  } = useFetch({
    url: "/api/v1/user",
    method: "PUT",
    body: userForm,
    token: token,
  });

  useEffect(() => {
    setUserForm(user);
  }, [user]);

  useEffect(() => {
    if (dataUpdate.success) {
      setShowModal(false);
      updateUser(dataUpdate.user);
    }
  }, [dataUpdate]);

  if (loadingUpdate) return <Loading />;
  if (errorUpdate) console.log(errorUpdate);

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setToken(token);
    fetchDataUpdate();
    if (dataUpdate.success) {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className={styles.centered1}>
        {showModal && (
          <Modal onClose={handleCloseModal}>
            <Title title="Modifier son profile" Level="h1" />
            <form
              onSubmit={(e) => {
                submitForm(e);
              }}>
              <div className={styles.flexContainer}>
                <Input
                  label="firstName"
                  type="text"
                  name="firstName"
                  value={userForm.firstName}
                  isRequired={true}
                  placeholder="enter your firstName"
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  label="lastName"
                  type="text"
                  name="lastName"
                  value={userForm.lastName}
                  isRequired={true}
                  placeholder="enter your lastName"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <Input
                label="email"
                type="text"
                name="email"
                value={userForm.email}
                isRequired={true}
                placeholder="enter your email"
                onChange={(e) => handleChange(e)}
              />
              <Button type="submit" title="modifier" className="btn__primary" />
            </form>
          </Modal>
        )}

        {user && (
          <>
            <div className={styles.centered}>
              <p className={styles.flexItem}>
                Type d'utilisateur: <span>{user.userType}</span>
              </p>
              <div className={styles.flexContainer}>
                <p className={styles.flexItem}>
                  Firstname: <span>{user.firstName}</span>
                </p>

                <p className={styles.flexItem}>
                  lastName: <span>{user.lastName}</span>
                </p>
              </div>
              <div className={styles.flexContainer}>
                <p className={styles.flexItem}>
                  Phone: <span>{user.phone}</span>
                </p>
                <p className={styles.flexItem}>
                  Email: <span>{user.email}</span>
                </p>
              </div>
            </div>
          </>
        )}

        <Button
          title="modifier"
          btn="btn"
          className="btn__primary"
          type="button"
          handleClick={handleButtonClick}
        />
      </div>
    </>
  );
};

export default Index;
