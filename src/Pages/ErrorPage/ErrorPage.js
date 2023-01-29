import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="grid h-screen px-4 bg-gray-900 place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-50 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-200">We can't find that page.</p>

        <Link
          to="/"
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white rounded bg-gradient-to-r from-red-600 to-red-900 focus:outline-none focus:ring"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
