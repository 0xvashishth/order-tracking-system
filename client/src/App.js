import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetDetailsQuery } from "./app/api/apiSclice";
import {logout, setCredentials} from "./app/api/features/authSlice";

const Index = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <div className="hero ">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Cafex</h1>
      <p className="py-6">A traditional premium restaurant feeling 🎉</p>
      {
                      userInfo ? 
                      userInfo.role === "user" ? <GeneralButton text={"GO TO CATALOG"} link={"/catalog"} /> : <GeneralButton text={"GO TO DASHBOARD"} link={"/admin/dashboard"} /> : <GeneralButton text={"Get Started"} link={"/signup"} />
                    }
    </div>
  </div>
</div>
    </>
  );
};

export default Index;

export const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);const dispatch = useDispatch()
  
  // automatically authenticate user if token is found
  const { data } = useGetDetailsQuery('userDetails', {
    pollingInterval: 90000, // 15mins
    skip: !document.cookie
  })

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data))
    }
  }, [data, dispatch])

  return (
    <header
      className={`pl-5 relativ left-0 top-0 z-20 flex w-full items-center`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <a href="/" className="block w-full">
              <img src="/logo.png" alt="logo" className="w-full dark:hidden" />
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div></div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              {
                
                userInfo ? userInfo.role === "user" ?  <SignupButton link={"/catalog"} text={"CATALOG"} /> : <SignupButton link={"/admin/dashboard"} text={"DASHBOARD"} /> : <><LoginButton link={"/login"} text={"LOGIN"} /> <SignupButton link={"/signup"} text={"SIGN UP"} /></>
              }
              {
                userInfo ? <button className="px-7 py-3 text-base font-medium text-dark hover:text-primary" onClick={() => dispatch(logout())}>
                LOGOUT
              </button> : ""
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const LoginButton = ({ text, link }) => {
  return (
    <a
      href={link}
      className="px-7 py-3 text-base font-medium text-dark hover:text-primary"
    >
      {text}
    </a>
  );
};

const GeneralButton = ({ text, link }) => {
  return (
    <a
      href={link}
      className="inline-flex items-center justify-center rounded-md bg-slate-300 px-6 py-3 text-center text-base font-medium hover:bg-slate-400 lg:px-7"
    >
      {text}
    </a>
  );
};


const SignupButton = ({ text, link }) => {
  return (
    <a
      href={link}
      className="rounded-lg bg-slate-300 px-7 py-3 text-base font-medium hover:bg-slate-400"
    >
      {text}
    </a>
  );
};
