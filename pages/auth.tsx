import Input from "@/components/input";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profiles",
      });
    } catch (err) {
      console.log(err);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, name, password, login]);

  return (
    <>
      <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-30">
          <nav className="px-12 py-2">
            <img src="/images/logo.jpg" alt="logo" className="h-12" />
          </nav>
          <div className="flex justify-center">
            <div className=" bg-black bg-opacity-70 px-12 pt-6 pb-4 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-3xl mb-5 font-semibold">
                {variant === "login" ? "Sign in" : "Register"}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === "register" && (
                  <Input
                    label="Username"
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setName(e.target.value)}
                    id="name"
                    value={name}
                  />
                )}

                <Input
                  label="Email"
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  value={email}
                />

                <Input
                  label="Password"
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  value={password}
                />
              </div>
              <button
                onClick={variant === "login" ? login : register}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-8 hover:bg-red-700 transition"
              >
                {variant === "login" ? "Login" : "Sign Up"}
              </button>

              <div className="flex flex-row items-center gap-8 mt-5 justify-center">
                <div
                  onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                  className="p-2 bg-white rounded-full items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FcGoogle size={50} />
                </div>
                <div
                  onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                  className="p-2 bg-white rounded-full items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FaGithub size={50} />
                </div>
              </div>
              <p className="text-neutral-500 mt-4">
                {variant === "login"
                  ? "First time using Netflix?"
                  : "Already have account"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {" "}
                  {variant === "login" ? "Create an Account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
