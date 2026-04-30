import { useState } from "react";
import { FieldErrors } from "../components/FieldErrors";
import { useNavigate, Navigate } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02FreeIcons } from "@hugeicons/core-free-icons";
import { signUpFormInitData, signInFormInitData } from "../utils/authUtils";
import type { FormValidationError } from "../types";
import { EmailFormField } from "../components/EmailFormField";
import { PasswordFormField } from "../components/PasswordFormField";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [signUpFormData, setSignUpFormData] = useState(signUpFormInitData);
  const [signUpValidationError, setSignUpValidationError] = useState<
    null | FormValidationError[]
  >(null);

  const [signInFormData, setSignInFormData] = useState(signInFormInitData);
  const [signInValidationError, setSignInValidationError] =
    useState<null | FormValidationError>(null);

  const navigate = useNavigate();

  // check if user is already signed in

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) return <Navigate to={"/chats"} />;

  const submitSignUpForm = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpFormData),
      });

      if (!res.ok) {
        const { errors } = await res.json();
        setSignUpValidationError(errors);
        return;
      }

      setSignUpFormData(signUpFormInitData);
      setSignUpValidationError(null);

      const { token, user } = await res.json();

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const submitSignInForm = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInFormData),
      });

      if (!res.ok) {
        const error = await res.json();
        setSignInValidationError(error);
        return;
      }

      setSignInFormData(signInFormInitData);
      setSignInValidationError(null);

      const { token, user } = await res.json();

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center max-w-3xl mx-auto border-x dark:border-slate-800 dark:bg-slate-900/90">
      <div className=" px-4 w-full ">
        <div className="relative flex mb-3 border dark:border-slate-700 dark:bg-slate-800 rounded-4xl">
          <div
            className="absolute top-1 bottom-1 rounded-3xl w-[calc(50%-4px)] bg-blue-600 transition-transform duration-200"
            style={{
              transform: `translateX(${activeTab === 0 ? "4px" : "calc(100% + 4px)"})`,
            }}
          />
          <button
            className="relative z-10 w-full py-3 font-semibold text-lg"
            onClick={() => setActiveTab(0)}
          >
            Sign Up
          </button>
          <button
            className="relative z-10 w-full py-3 font-semibold text-lg"
            onClick={() => setActiveTab(1)}
          >
            Sign In
          </button>
        </div>

        {activeTab === 0 && (
          <>
            <p className="text-center text-2xl my-4">Create Account</p>
            <form className="flex flex-col gap-5" onSubmit={submitSignUpForm}>
              <div className="flex flex-col gap-2">
                <label htmlFor="username">
                  Username<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  placeholder="johndoe123"
                  className="border dark:border-slate-700 dark:bg-slate-800  rounded-xl focus:outline-2 focus:outline-blue-600 px-3 py-2.5"
                  maxLength={10}
                  minLength={3}
                  value={signUpFormData.username}
                  onChange={(e) =>
                    setSignUpFormData({
                      ...signUpFormData,
                      username: e.target.value,
                    })
                  }
                />

                <FieldErrors
                  fieldName={"username"}
                  validationErrors={signUpValidationError}
                />
              </div>

              <div className="flex flex-col gap-2">
                <EmailFormField
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                />
                <FieldErrors
                  fieldName={"email"}
                  validationErrors={signUpValidationError}
                />
              </div>

              <div className="flex flex-col gap-2">
                <PasswordFormField
                  label="Set A Password"
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                />
                <FieldErrors
                  fieldName={"password"}
                  validationErrors={signUpValidationError}
                />
              </div>

              <button className="font-bold bg-blue-600 text-xl py-3 rounded-xl flex items-center justify-center gap-1">
                Get Started{" "}
                <HugeiconsIcon icon={ArrowRight02FreeIcons} strokeWidth={2.5} />
              </button>
            </form>
          </>
        )}

        {activeTab === 1 && (
          <>
            <p className="text-center text-2xl my-4">Welcome Back!</p>
            <form className="flex flex-col gap-5" onSubmit={submitSignInForm}>
              <div className="flex flex-col gap-2">
                <EmailFormField
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                />
                <FieldErrors
                  fieldName="email"
                  validationErrors={signInValidationError}
                />
              </div>

              <div className="flex flex-col gap-2">
                <PasswordFormField
                  label="Enter Password"
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                />
                <FieldErrors
                  fieldName="password"
                  validationErrors={signInValidationError}
                />
              </div>

              <button className="font-bold bg-blue-600 text-xl py-3 rounded-xl flex items-center justify-center gap-1">
                Sign In{" "}
                <HugeiconsIcon icon={ArrowRight02FreeIcons} strokeWidth={2.5} />
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
};

export default AuthPage;
