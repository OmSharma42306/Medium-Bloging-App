import { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUpInput } from "@omsharma_42306/medium-common-package";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<signUpInput>({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const responce = await axios.post(
        `${BACKEND_URL}api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = responce.data;
      localStorage.setItem("token", jwt.token);
      navigate(`${type === "signup" ? "/signin" : "/blogs"}`);
    } catch (e:any) {
        console.log(e.message);
        
        


    }
  }

  return (
    <div className="h-screen flex justify-center flex-col	">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold ">Create an Account</div>
            <div className="text-slate-400">
              {type === "signin"
                ? "Don't have an Account?"
                : "Already Have an Account?"}
              <Link
                className="pt-3 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "SignUp" : "Signin"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="John Doe"
                onchange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}

            <LabelledInput
              label="Username"
              placeholder="johndoe@gmail.com"
              onchange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="*******"
              onchange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign Up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInput {
  label: string;
  placeholder: string;
  type?: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, type, onchange }: LabelledInput) {
  return (
    <div>
      <label className="block mb-2 pt-2 text-sm font-medium text-gray-900 :text-white">
        {label}
      </label>
      <input
        type={type || "text"}
        onChange={onchange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
