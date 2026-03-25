import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);
    toast.success("Login successful");
    navigate("/app");
  }
}, [navigate]);
  const query = new URLSearchParams(window.location.search);
  const urlstate = query.get("state");
  const [state, setState] = React.useState(urlstate || "login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const endpoint =
    state === "login"
      ? `${API}/auth/login`
      : `${API}/auth/register`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data.message);
    return;
  }

  localStorage.setItem("token", data.token);
  toast.success("Login successful 🎉");

  setTimeout(() => {
  window.location.href = "/app";
  }, 1000);


  // localStorage.setItem("token", data.token);
  // window.location.href = "/app";
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-blackrelative overflow-hidden px-4">
      {/* Subtle animated blobs */}
      

      <form
        onSubmit={handleSubmit}
        className="w-[420px] max-w-full bg-white shadow-2xl rounded-[2rem] p-8 md:p-10 relative z-10 box-border transition-all duration-300 hover:shadow-2xl"
      >
        {/* Header */}
        <div className="mb-8 text-center">
           <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-100/50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 mb-5 shadow-inner">
             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
           </div>
           <h1 className="text-3xl font-bold text-black tracking-tight">
             {state === "login" ? "Welcome Back" : "Create Account"}
           </h1>
           <p className="text-gray-600 mt-2 font-medium text-sm">
             {state === "login"
               ? "Login to continue building"
               : "Sign up to get started"}
           </p>
        </div>

        <div className="space-y-4">
          {/* Name */}
          {state !== "login" && (
            <div>
              <label className="block text-sm font-semibold text-black mb-1.5 ml-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border bg-white border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 "
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-400"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1 ml-1">
              <label className="block text-sm font-semibold text-slate-700">Password</label>
              {state === "login" && (
                <button
                  type="button"
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
                >
                  {/* Forgot password? */}
                </button>
              )}
            </div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-400"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-semibold shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] transition-all active:scale-[0.98] active:shadow-none"
        >
          {state === "login" ? "Sign In" : "Create Account"}
        </button>

        {/* Separator */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200/80 dark:border-slate-700/80"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase font-bold tracking-wider">
            <span className="px-3 bg-[#e4e7f1] rounded-full text-slate-900 py-0.5">Or continue with</span>
          </div>
        </div>

        {/* Social */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`${API}/auth/google`}
            className="flex items-center justify-center gap-2 w-full bg-white/80 border border-slate-200 dark:border-slate-700 py-2.5 rounded-xl hover:bg-white hover:shadow-lg transition-all text-slate-700 font-semibold text-sm group"
          >
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Google
          </a>
          <a
             href={`${API}/auth/github`}
             className="flex items-center justify-center gap-2 w-full bg-slate-900 border border-slate-900 py-2.5 rounded-xl hover:bg-slate-800 hover:shadow-md transition-all text-white font-semibold text-sm group"
          >
             <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 group-hover:scale-110 transition-transform"><path d="M12 0C5.37 0 0 5.48 0 12.24c0 5.41 3.44 9.99 8.21 11.61.6.12.82-.26.82-.58v-2.04c-3.34.74-4.04-1.65-4.04-1.65-.55-1.42-1.34-1.8-1.34-1.8-1.09-.76.08-.75.08-.75 1.2.09 1.83 1.27 1.83 1.27 1.07 1.87 2.81 1.33 3.5 1.02.11-.8.42-1.33.76-1.64-2.66-.31-5.47-1.36-5.47-6.06 0-1.34.46-2.44 1.23-3.3-.12-.31-.54-1.57.12-3.27 0 0 1-.33 3.3 1.26a11.18 11.18 0 0 1 6 0c2.3-1.59 3.3-1.26 3.3-1.26.66 1.7.24 2.96.12 3.27.77.86 1.23 1.96 1.23 3.3 0 4.71-2.82 5.75-5.5 6.05.43.38.82 1.12.82 2.26v3.35c0 .32.22.7.82.58C20.56 22.23 24 17.65 24 12.24 24 5.48 18.63 0 12 0z" /></svg>
             GitHub
          </a>
        </div>

        {/* Switch */}
        <p className="text-center text-sm text-slate-600 mt-8 font-medium">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            className="text-indigo-600 font-bold cursor-pointer hover:text-indigo-700 hover:underline transition-all"
          >
            {state === "login" ? "Sign up" : "Sign in"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
