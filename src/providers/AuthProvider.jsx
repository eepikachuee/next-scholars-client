import React from "react";
import { auth } from "../../firebase.init";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const AuthProvider = ({ children }) => {
  const handleCreateUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  const authData = {
    handleCreateUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
