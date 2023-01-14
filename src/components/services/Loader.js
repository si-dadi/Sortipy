import React from "react";
import loader  from "./loader.svg";
function Loader() {
  return (
    <div className=" flex items-center flex-col md:mt-[12%] sm:mt-[30%] ">
      <h1 className="font-bold text-3xl text-white mt-2"> Hang On! </h1>
      <img src={loader} alt="loader" className=" bg-blck rounded-full bg-slate" />
      <h3 className="font-bold text-2xl text-white mt-2">Connecting to the Database...</h3>
      <h5 className="mt-8 text-slate-400">If you continue to see this for a while, try navigating through different pages a bunch of times!</h5>
    </div>
  );
}

export default Loader;
