import { useState } from "react";

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const generateBtnColor = (btnIndex: number) => {
    return {
      backgroundColor: activeTab === btnIndex ? "black" : "white",
      color: activeTab === btnIndex ? "white" : "black",
    };
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="border p-3 m-3">
        <div className="border flex mb-2">
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
            Log In
          </button>
        </div>

        {activeTab === 0 && (
          <div>
            <p className="text-center text-2xl">Create Account</p>
            <form>
              <div>
                <label htmlFor="username">
                  Username<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  placeholder="johndoe123"
                />
              </div>

              <div>
                <label htmlFor="email">
                  Email Address<span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="johndoe@example.com"
                />
              </div>

              <div>
                <label htmlFor="password">
                  Set A Password<span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  placeholder="Set A Password*"
                />
              </div>

              <button>Get Started</button>
            </form>
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <p>Welcome Back!</p>
            <form>
              <div>
                <label htmlFor="email">
                  Email Address<span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="johndoe@example.com"
                />
              </div>

              <div>
                <label htmlFor="password">
                  Set A Password<span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  placeholder="Set A Password*"
                />
              </div>

              <button>Log In</button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};
