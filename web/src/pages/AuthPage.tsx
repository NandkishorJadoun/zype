import { useState } from "react";
import { FieldErrors } from "../components/FieldErrors";
import { useNavigate } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02FreeIcons } from "@hugeicons/core-free-icons";

export interface FormValidationError {
  fieldName: string;
  message: string;
}

const signUpFormInitialData = {
  username: "",
  email: "",
  password: "",
};

const signInFormInitialData = {
  email: "",
  password: "",
};

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [signUpFormData, setSignUpFormData] = useState(signUpFormInitialData);
  const [signUpValidationError, setSignUpValidationError] = useState<
    null | FormValidationError[]
  >(null);

  const [signInFormData, setSignInFormData] = useState(signInFormInitialData);
  const [signInValidationError, setSignInValidationError] =
    useState<null | FormValidationError>(null);

  const navigate = useNavigate();

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

      setSignUpFormData(signUpFormInitialData);
      setSignUpValidationError(null);

      // if success then navigate user to /chats
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

      const { token, user } = await res.json();

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return navigate("/chats", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center mx-3 dark:text-slate-100">
      <div className=" p-3 min-w-full">
        <div className="relative flex mb-3 border dark:border-slate-800 dark:bg-slate-900 rounded-4xl">
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
                  className="border dark:border-slate-800 dark:bg-slate-900  rounded-xl focus:outline-2 focus:outline-blue-600 px-3 py-2.5"
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
                <label htmlFor="email">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="johndoe@example.com"
                  className="border dark:border-slate-800 dark:bg-slate-900  rounded-xl focus:outline-2 focus:outline-blue-600 px-3 py-2.5"
                  value={signUpFormData.email}
                  onChange={(e) =>
                    setSignUpFormData({
                      ...signUpFormData,
                      email: e.target.value,
                    })
                  }
                />

                <FieldErrors
                  fieldName={"email"}
                  validationErrors={signUpValidationError}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password">
                  Set A Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  maxLength={20}
                  placeholder="••••••••"
                  className="border dark:border-slate-800 dark:bg-slate-900  rounded-xl focus:outline-2 focus:outline-blue-600 px-3 py-2.5"
                  value={signUpFormData.password}
                  onChange={(e) =>
                    setSignUpFormData({
                      ...signUpFormData,
                      password: e.target.value,
                    })
                  }
                />

                <FieldErrors
                  fieldName={"password"}
                  validationErrors={signUpValidationError}
                />
              </div>

              <button className="font-bold bg-blue-600 text-xl py-2 rounded-xl flex items-center justify-center gap-1">
                Get Started <HugeiconsIcon icon={ArrowRight02FreeIcons} strokeWidth={2.5} />
              </button>
            </form>
          </>
        )}

        {activeTab === 1 && (
          <>
            <p className="text-center text-2xl my-4">Welcome Back!</p>
            <form className="flex flex-col gap-5" onSubmit={submitSignInForm}>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="johndoe@example.com"
                  className="border dark:border-slate-800 dark:bg-slate-900  rounded-xl focus:outline-2 focus:outline-blue-600 px-3 py-2.5"
                  value={signInFormData.email}
                  onChange={(e) => {
                    setSignInFormData({
                      ...signInFormData,
                      email: e.target.value,
                    });
                  }}
                />
                <FieldErrors
                  fieldName="email"
                  validationErrors={signInValidationError}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password">
                  Enter Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  maxLength={20}
                  placeholder="••••••••"
                  className="border dark:border-slate-800 dark:bg-slate-900  rounded-xl focus:outline-2 focus:outline-blue-600 px-3 py-2.5"
                  value={signInFormData.password}
                  onChange={(e) => {
                    setSignInFormData({
                      ...signInFormData,
                      password: e.target.value,
                    });
                  }}
                />
                <FieldErrors
                  fieldName="password"
                  validationErrors={signInValidationError}
                />
              </div>

              <button className="font-bold bg-blue-600 text-xl py-2 rounded-xl flex items-center justify-center gap-1">
                Sign In <HugeiconsIcon icon={ArrowRight02FreeIcons} strokeWidth={2.5} />
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
};
