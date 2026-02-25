import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);
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
      ? "http://localhost:5000/auth/login"
      : "http://localhost:5000/auth/register";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  localStorage.setItem("token", data.token);
  window.location.href = "/app";
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-[380px] h-md max-w-md bg-white rounded-2xl shadow-2xl px-3 py-3"
      >
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          {state === "login" ? "Welcome Back " : "Create Account "}
        </h1>
        <p className="text-gray-500 text-center mt-2">
          {state === "login"
            ? "Login to continue"
            : "Sign up to get started"}
        </p>

        {/* Name */}
        {state !== "login" && (
          <div className="mt-2">
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-1 py-1.5 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
        )}

        {/* Email */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-1 py-1.5 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-1 py-1.5 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Forgot */}
        {state === "login" && (
          <div className="text-right mt-2">
            <button
              type="reset"
              className="text-sm text-indigo-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}


        {/* {OR} */}

        <div className="flex items-center my-3"> 
          <div className="flex-grow border-t"></div>
            <span className="mx-3 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t"></div>
        </div>

       
        {/* Google Login */}
        <a
          href="http://localhost:5000/auth/google"
          className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-4 h-4"
          />
          <span className="font-medium">Continue with Google</span>
        </a>
     

     <a
        href="http://localhost:5000/auth/github"
        className="flex items-center justify-center gap-3 w-full mt-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
      >
       <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
       >
       <path d="M12 0C5.37 0 0 5.48 0 12.24c0 5.41 3.44 9.99 8.21 11.61.6.12.82-.26.82-.58v-2.04c-3.34.74-4.04-1.65-4.04-1.65-.55-1.42-1.34-1.8-1.34-1.8-1.09-.76.08-.75.08-.75 1.2.09 1.83 1.27 1.83 1.27 1.07 1.87 2.81 1.33 3.5 1.02.11-.8.42-1.33.76-1.64-2.66-.31-5.47-1.36-5.47-6.06 0-1.34.46-2.44 1.23-3.3-.12-.31-.54-1.57.12-3.27 0 0 1-.33 3.3 1.26a11.18 11.18 0 0 1 6 0c2.3-1.59 3.3-1.26 3.3-1.26.66 1.7.24 2.96.12 3.27.77.86 1.23 1.96 1.23 3.3 0 4.71-2.82 5.75-5.5 6.05.43.38.82 1.12.82 2.26v3.35c0 .32.22.7.82.58C20.56 22.23 24 17.65 24 12.24 24 5.48 18.63 0 12 0z" />
      </svg>
      <span className="font-medium">Continue with GitHub</span>
     </a>



     {/* Submit */}
        <button
          type="submit"
          className="w-full mt-4 bg-indigo-500 text-white py-2 rounded-lg font-medium hover:bg-indigo-600 transition"
        >
          {state === "login" ? "Login" : "Sign Up"}
        </button>

        {/* Switch */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            {state === "login" ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
