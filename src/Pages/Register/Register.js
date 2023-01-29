import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SmallSpinner from "../../Components/SmallSpinner";
import { AuthContext } from "../../Context/AuthProvider";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    axios
      .post(`http://localhost:5000/api/registration`, userData)
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
        navigate("/");
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
    <section className="min-h-screen flex flex-wrap lg:justify-center lg:items-center">
      <div className="w-full h-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2">
        <div className="my-6">
          <h1 className="my-t text-center text-3xl font-extrabold text-gray-50">
            Register your account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-200">
            Or
            <Link
              to="/login"
              className="font-medium text-rose-200 border-b border-rose-600"
            >
              {" "}
              Login in your account{" "}
            </Link>
          </p>
        </div>
        <div className="max-w-md w-full mx-auto text-gray-50 font-medium bg-gray-700/60 shadow rounded-lg p-8 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col">
              <label
                className="text-base font-semibold text-gray-50 mb-1"
                htmlFor="email"
              >
                Name
              </label>
              <input
                className="border border-gray-400 rounded-md bg-gray-700/60 px-3 py-2 "
                type="text"
                name="name"
                id="name"
                placeholder="Enter your Name"
                {...register("name", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Name must be at least 6 characters",
                  },
                })}
              />
              {errors?.name && (
                <p className="text-red-300 mt-1">
                  {errors?.name?.message
                    ? errors?.name?.message
                    : "Name is required"}
                </p>
              )}
            </div>

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
                {...register("password", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[a-z]{2})(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]{6,}$/,
                    message:
                      "Password should contain 6 characters, 1 uppercase, 2 lowercase, 1 number and 1 special character",
                  },
                })}
              />
              {errors?.password && (
                <p className="text-red-300 mt-1">
                  {errors?.password?.message
                    ? errors?.password?.message
                    : "Password is required"}
                </p>
              )}
            </div>
            <div>
              <button className="w-full bg-gradient-to-r from-rose-800 to-rose-600 text-gray-50 rounded-md p-2">
                {loading ? <SmallSpinner /> : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
