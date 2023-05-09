import useFetch from "@/hooks/useFetch";
import React from "react";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import UserContext from "@/context/UserContext";
import Loading from "@/components/UI/Loading";
import { useContext } from "react";
const Index = () => {
  const { user, isLogged, logout } = useContext(UserContext);
  const [token, setToken] = useState();
  const [users, setUsers] = useState({});
  const { fetchData, data, error, loading } = useFetch({
    url: "user/admin/users",
    method: "GET",
    body: null,
    token: token,
  });

  const { fetchDataDelete, dataDelete,  } = useFetch({
    url: "/admin/user/:id",
    method: "DELETE",
    body: null,
    token: token,
  });

  useEffect(() => {
    setUsers(data);
    if (users == {}) {
      return;
    }
  }, [data]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    fetchDataDelete(id);
    const result = await dataDelete;
    if (result) {
        alert("User deleted successfully");
        fetchData();
    } else {
        alert("An error occurred while deleting the user");
    }
  };

  return (
    <>
      <table className={styles.tab}>
        <thead>
          <tr>
            <th className={styles.tableUser}>First Name</th>
            <th className={styles.tableUser}>Last Name</th>
            <th className={styles.tableUser}>Email</th>
            <th className={styles.tableUser}>Phone</th>
            <th className={styles.tableUser}>Ville</th>
            <th className={styles.tableUser}>Address</th>
            <th className={styles.tableUser}>Zip Code</th>
            <th className={styles.tableUser}>User-Type</th>
            <th className={styles.tableUser}>DELETE USER</th>
          </tr>
        </thead>
        <tbody className={styles.tab}>
          {data && data.success && data.users.map((user) => (
              <>
                <tr key={user._id} className={styles.tableUser}>
                  <td className={styles.tableUser}>{user.firstName}</td>
                  <td className={styles.tableUser}>{user.lastName}</td>
                  <td className={styles.tableUser}>{user.email}</td>
                  <td className={styles.tableUser}>{user.phone}</td>
                  <td className={styles.tableUser}>{user.address.city}</td>
                  <td className={styles.tableUser}>{user.address.street}</td>
                  <td className={styles.tableUser}>{user.address.zipCode}</td>
                  <td className={styles.tableUser}>{user.userType}</td>
                  <td className={styles.tableUser}>
                    <Button onClick={() => handleDelete(user._id)}>
                    Delete
                    </Button>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Index;