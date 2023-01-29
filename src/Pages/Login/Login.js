import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SmallSpinner from "../../Components/SmallSpinner";
import { AuthContext } from "../../Context/AuthProvider";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const location = useLocation();
  let navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    const userData = {
      email: data.email,
      password: data.password,
    };
    axios
      .post(`https://powerhack-server.vercel.app/api/login`, userData)
      .then((res) => {
        toast.success(res.data.message, {
          style: {
            background: "#363f4d",
            color: "#fff",
          },
        });
        localStorage.setItem("powerhack-token", res.data.token);
        setAuth(true);
        setLoading(false);
        reset();
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          style: {
            background: "#363f4d",
            color: "#fff",
          },
        });
        setLoading(false);
      });
  };
  return (
    <section className="min-h-screen flex flex-col items-center justify-center space-y-10 py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-50">
          Login to your account
        </h1>
        <p className="mt-2 text-center text-sm text-gray-200">
          Or
          <Link
            to="/register"
            className="font-medium text-rose-200 border-b border-rose-600"
          >
            {" "}
            register here your account{" "}
          </Link>
        </p>
      </div>
      <div className="max-w-md w-full mx-auto text-gray-50 font-medium bg-gray-700/60 shadow rounded-lg p-8 space-y-6">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label
              className="text-base font-semibold text-gray-50 mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="border border-gray-400 rounded-md bg-gray-700/60 px-3 py-2 "
              type="email"
              name="email"
              id="email"
              placeholder="Enter your Email Address"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$/,
                  message: "Email is invalid",
                },
              })}
            />
            {errors?.email && (
              <p className="text-red-300 mt-1">
                {errors?.email?.message
                  ? errors?.email?.message
                  : "Email adress is required"}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              className="text-base font-semibold text-gray-50 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-400 rounded-md bg-gray-700/60 px-3 py-2"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
              {...register("password", { required: true })}
            />
            {errors?.password && (
              <p className="text-red-300 mt-1">Password is required</p>
            )}
          </div>
          <div>
            <button className="w-full bg-gradient-to-r from-rose-800 to-rose-600 text-gray-50 rounded-md p-2">
              {loading ? <SmallSpinner /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
