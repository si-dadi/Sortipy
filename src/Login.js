import React, { useEffect, useState } from "react";
import { auth, provider, fbProvider } from "./firebase";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import Home from "./components/Home";
import "./login.css";
function Login() {
  const [value, setValue] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.displayName);
      localStorage.setItem("displayName", data.user.displayName);
      setValue(data.user.photoURL);
      localStorage.setItem("photoURL", data.user.photoURL);
    });
  };

  const handleClickFacebook= () => {
    signInWithPopup(auth, fbProvider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    localStorage.setItem("displayName", user)
    // ...
  })

  }

  useEffect(() => {
    setValue(localStorage.getItem("displayName"));
    setValue(localStorage.getItem("photoURL"));
  });
  return (
    <div>
      {value ? (
        <Home />
      ) : (
        <>
          <div className=" relative bg-slate-900 flex flex-col w-full justify-center items-center min-h-screen overflow-hidden ">
              <h1 className="text-white mb-5">Welcome to Sortipy</h1>
            <div>
              <img className=" rounded-3xl" src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2021/12/metallic-spotify-logo.jpg" width={'400px'}/>
              </div>
            <div
              className=" justify-center flex flex-col align-middle text-center h-fit w-full login relative text-white"
            >
              <div className="font-medium flex flex-col items-center my-5">
                <button
                  className=" inline-flex sd:scale-50 sd:w-1/4 ld:w-1/4 px-4 py-2 tracking-wide transition-colors duration-200 text-black/60 transform bg-slate-300 rounded-md hover:bg-slate-400 hover:text-black/80 focus:outline-none focus:bg-slate-600"
                  onClick={handleClick}
                >
                  <img className="mr-4" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                  Login With Google{" "}
                </button>
                <button
                  className=" inline-flex sd:scale-50 sd:w-1/4 ld:w-1/4 px-4 py-2 my-3 tracking-wide transition-colors duration-200 text-black/60 transform bg-cyan-200 rounded-md hover:bg-blue-400 hover:text-black/80 focus:outline-none focus:bg-blue-500"
                  onClick={handleClickFacebook}
                >
                  <img className="mr-4" width={'25px'} src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"/>
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
