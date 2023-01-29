import React from "react";
import { Link } from "react-router-dom";
import curveLines from "../../Assets/curved-lines.png";
import powerImg from "../../Assets/power-distrubution.jpg";

const Home = () => {
  return (
    <section>
      <div className="relative">
        <section className="overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px]">
            <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
              <div className="absolute bottom-0 right-0 hidden lg:block">
                <img
                  className="object-contain w-auto h-48"
                  src={curveLines}
                  alt=""
                />
              </div>

              <div className="relative px-4 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:pb-24 lg:text-left">
                <h1 className="text-4xl font-bold sm:text-6xl xl:text-6xl">
                  Powering success <br className="my-2 inline-block" />
                  Efficient, Reliable.
                </h1>
                <p className="mt-8 text-xl">
                  Power Hack is a power distribution company that provides
                  efficient, and sustainable power solutions for industries and
                  customers.
                </p>
                <Link
                  to="/billing"
                  className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-2 mt-8 rounded inline-block font-semibold"
                >
                  Pay Bill
                </Link>
              </div>
            </div>

            <div className="relative w-full overflow-hidden lg:order-1 h-96 lg:h-auto lg:w-5/12">
              <div className="absolute inset-0">
                <img
                  className="object-cover w-full h-full"
                  src={powerImg}
                  alt=""
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

              <div className="absolute bottom-0 left-0">
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center">
                    <svg
                      className="w-10 h-10 sm:w-12 sm:h-12 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h2 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl ml-2.5">
                      Instant Power
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Home;
