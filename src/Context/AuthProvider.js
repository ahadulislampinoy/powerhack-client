import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [paidTotal, setPaidTotal] = useState(0);
  const [entirePaidTotal, setEntirePaidTotal] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("powerhack-token");

    if (token) {
      axios
        .post(`http://localhost:5000/api/userData`, { token })
        .then((res) => {
          setUser(res.data);
          setAuth(true);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [loading, auth]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/paid-total`).then((res) => {
      setEntirePaidTotal(res.data);
    });
  }, [user, paidTotal]);

  const authInfo = {
    auth,
    user,
    setAuth,
    loading,
    paidTotal,
    setPaidTotal,
    entirePaidTotal,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
