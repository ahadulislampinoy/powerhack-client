import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
      <div className="max-w-md w-full mx-auto text-gray-50 font-medium bg-gray-700 shadow rounded-lg p-8 space-y-6">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label
              className="text-base font-semibold text-gray-50 mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="border border-gray-400 rounded-md bg-gray-700 px-3 py-2 "
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
              className="border border-gray-400 rounded-md bg-gray-700 px-3 py-2"
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
            {/* {authError && (
              <p className="text-red-500 my-1">{authError.message}</p>
            )} */}
            <button className="w-full bg-gradient-to-r from-rose-800 to-rose-600 text-gray-50 rounded-md p-2">
              {/* {loading ? <SmallSpinner /> : "Login"} */} Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
