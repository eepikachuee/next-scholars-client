import React, { useEffect, useState } from "react";
import { auth } from "../../firebase.init";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  //
  const handleCreateUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //
  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  //
  const handleSignInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //
  const handleGoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //
  const handleSignOutUser = () => {
    return signOut(auth);
  };

  //
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  console.log(user);

  //
  const authData = {
    user,
    setUser,
    handleCreateUser,
    handleSignInUser,
    handleGoogleSignIn,
    handleSignOutUser,
    updateUser,
    loading,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
