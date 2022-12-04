import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useHistory } from "react-router-dom";

import AllMeetupsPage from "./AllMeetups";
import SignIn from "../components/layout/SignIn.js";

function WelcomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        history.replace("/all-meetups");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        history.replace("/all-meetups");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Please confirm that email are the same");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Please confirm that password are the same");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        history.replace("/all-meetups");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <SignIn
      email={email}
      password={password}
      isRegistering={isRegistering}
      registerInformation={registerInformation}
      setRegisterInformation={setRegisterInformation}
      handleRegister={handleRegister}
      setIsRegistering={setIsRegistering}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSignIn={handleSignIn}
    />
  );
}

export default WelcomePage;
