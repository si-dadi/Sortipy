import React, { useEffect, useState } from "react";
import { auth, provider, fbProvider, db } from "./components/services/firebase";
import { doc, setDoc, arrayUnion } from "firebase/firestore";

import {
  signInWithPopup,
  FacebookAuthProvider,
  updateProfile,
  OAuthProvider,
  linkWithPopup,
} from "firebase/auth";
import Home from "./components/Home";

function Login() {
  const [value, setValue] = useState("");
  // Merging multiple Auth Providers
  // const repo = new MyUserDataRepo();
  // const prevUser = auth.currentUser;
  // const prevUserData = repo.get(prevUser);
  // repo.delete(prevUser);

  const GoogleLogin = async () => {
    await signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.displayName);
      localStorage.setItem("displayName", data.user.displayName);
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      setValue(data.user.photoURL);
      localStorage.setItem("photoURL", data.user.photoURL);

      // create firebase doc
      const userDoc = doc(db, "users", `${data.user.email}`);
      setDoc(userDoc, {LikedSongs: arrayUnion()}, {merge: true});
    });

    // .then(async (result) => {
    //   const currentUser = result.user;
    //   const currentUserData = repo.get(currentUser);
    //   const mergedData = repo.merge(prevUserData, currentUserData);
    //   const credential = OAuthProvider.credentialFromResult(result);
    //   const linkResult = await linkWithPopup(prevUser, credential);
    //   // Sign in with the newly linked credential
    //   const linkCredential = OAuthProvider.credentialFromResult(linkResult);
    //   const signInResult = await signInWithPopup(auth, linkCredential);
    //   // Save the merged data to the new user
    //   repo.set(signInResult.user, mergedData);
    // });
  };

  const FacebookLogin = async () => {
    await signInWithPopup(auth, fbProvider).then((data) => {
      // display user pfp (broken rip)
      // const credential = FacebookAuthProvider.credentialFromResult(data);
      // const AccessToken = credential.accessToken;
      // let photoUrl = data.user.photoURL + `access_token=${AccessToken}`
      // updateProfile(auth.currentUser, {photoURL:photoUrl})

      setValue(data.user.displayName);
      localStorage.setItem("displayName", data.user.displayName);
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      setValue(data.user.photoURL);
      localStorage.setItem("photoURL", data.user.photoURL);
    });
    // .then(async (result) => {
    //   const currentUser = result.user;
    //   const currentUserData = repo.get(currentUser);
    //   const mergedData = repo.merge(prevUserData, currentUserData);
    //   const credential = OAuthProvider.credentialFromResult(result);
    //   const linkResult = await linkWithPopup(prevUser, credential);
    //   // Sign in with the newly linked credential
    //   const linkCredential = OAuthProvider.credentialFromResult(linkResult);
    //   const signInResult = await signInWithPopup(auth, linkCredential);
    //   // Save the merged data to the new user
    //   repo.set(signInResult.user, mergedData);
    // });

    // create user on firestore
    // const docRef = await addDoc(collection(db, "users"), {
    //   uname: localStorage.getItem("emailAdd"),
    // });
    // const dbRef = doc(db, "users");
    // setDoc(dbRef, { key: `${localStorage.getItem("email")}` });
  };

  useEffect(() => {
    setValue(localStorage.getItem("displayName"));
    setValue(localStorage.getItem("photoURL"));
  });
  return (
    <div>
      {value ? (
        <Home/>
      ) : (
        <>
          <div className=" relative bg-slate-900 flex flex-col w-full justify-center items-center min-h-screen overflow-hidden ">
            <h1 className="text-white mb-5">Welcome to Sortipy</h1>
            <div>
              <img
                className=" rounded-3xl"
                src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2021/12/metallic-spotify-logo.jpg"
                width={"400px"}
              />
            </div>
            <div className=" justify-center flex flex-col align-middle text-center h-fit w-full login relative text-white">
              <div className="font-medium flex flex-col items-center my-5">
                <button
                  className=" inline-flex sd:scale-50 sd:w-1/4 ld:w-1/4 px-4 py-2 tracking-wide transition-colors duration-200 text-black/60 transform bg-slate-300 rounded-md hover:bg-slate-400 hover:text-black/80 focus:outline-none focus:bg-slate-600"
                  onClick={GoogleLogin}
                >
                  <img
                    className="mr-4"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  />
                  Login With Google{" "}
                </button>
                <button
                  className=" inline-flex sd:scale-50 sd:w-1/4 ld:w-1/4 px-4 py-2 my-3 tracking-wide transition-colors duration-200 text-black/60 transform bg-cyan-200 rounded-md hover:bg-blue-400 hover:text-black/80 focus:outline-none focus:bg-blue-500"
                  onClick={FacebookLogin}
                >
                  <img
                    className="mr-4"
                    width={"25px"}
                    src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                  />
                  Login With Facebook{" "}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
