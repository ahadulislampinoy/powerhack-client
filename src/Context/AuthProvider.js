import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("powerhack-token");
    if (token) {
      axios
        .post(`http://localhost:5000/api/userData`, { token })
        .then((res) => {
          setUser(res.data);
          setAuth(true);
          setLoading(false);
        });
    }
  }, [loading, auth]);

  const authInfo = { auth, user, setAuth, loading };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
