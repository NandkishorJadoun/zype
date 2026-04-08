import { useState } from "react";
import { FieldErrors } from "../components/FieldErrors";
import { useNavigate } from "react-router";

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

  const generateBtnColor = (btnIndex: number) => {
    return {
      backgroundColor: activeTab === btnIndex ? "black" : "white",
      color: activeTab === btnIndex ? "white" : "black",
    };
  };

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
    <main className="min-h-screen flex justify-center items-center mx-3">
      <div className="border p-3 min-w-full">
        <div className="border flex mb-3">
          <button
            className="w-full py-2 font-semibold"
            style={generateBtnColor(0)}
            onClick={() => setActiveTab(0)}
          >
            Sign Up
          </button>
          <button
            className="w-full py-2 font-semibold"
            style={generateBtnColor(1)}
            onClick={() => setActiveTab(1)}
          >
            Sign In
          </button>
        </div>

        {activeTab === 0 && (
          <>
            <p className="text-center text-2xl mb-1.5">Create Account</p>
            <form className="flex flex-col gap-4" onSubmit={submitSignUpForm}>
              <div className="flex flex-col gap-1">
                <label htmlFor="username">
                  Username<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  placeholder="johndoe123"
                  className="border px-2 py-1"
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

              <div className="flex flex-col gap-1">
                <label htmlFor="email">
                  Email Address<span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="johndoe@example.com"
                  className="border px-2 py-1"
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

              <div className="flex flex-col gap-1">
                <label htmlFor="password">
                  Set A Password<span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  maxLength={20}
                  placeholder="abcd1234"
                  className="border px-2 py-1"
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

              <button className="font-bold bg-black text-xl text-white py-2">
                Get Started
              </button>
            </form>
          </>
        )}

        {activeTab === 1 && (
          <>
            <p className="text-center text-2xl mb-1.5">Welcome Back!</p>
            <form className="flex flex-col gap-4" onSubmit={submitSignInForm}>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">
                  Email Address<span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="johndoe@example.com"
                  className="border px-2 py-1"
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

              <div className="flex flex-col gap-1">
                <label htmlFor="password">
                  Set A Password<span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  maxLength={20}
                  placeholder="abcd1234"
                  className="border px-2 py-1"
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

              <button className="font-bold bg-black text-xl text-white py-2">
                Sign In
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
};
