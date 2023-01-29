import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { Tooltip } from "react-tooltip";
import "./Billing.css";

const Billing = () => {
  return (
    <section class="sm:mt-8 min-h-screen bg-gray-900 px-4 sm:px-6 md:px-10">
      <div className="flex w-full justify-center">
        <div class="overflow-auto lg:overflow-visible">
          <h1 class="text-3xl w-full text-gray-100 font-bold mb-6">Billings</h1>
          <div class="flex items-center justify-between mt-4 space-x-2">
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input
                  type="text"
                  class="bg-gray-700 text-gray-100 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Search"
                />
                <div class="absolute top-0 flex items-center h-full ml-3">
                  <svg
                    class="h-5 w-5 text-gray-500"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <button class="bg-gradient-to-r from-red-600 to-red-800 text-gray-100 px-4 py-2 rounded-full font-semibold flex justify-center items-center sm:block">
                Add New
                <PlusCircleIcon class="h-6 w-6 inline-block ml-2 text-gray-50" />
              </button>
            </div>
          </div>
          <table class="table border-separate space-y-6">
            <thead class="bg-gray-700 text-gray-100">
              <tr className="px-2">
                <th class="py-4 px-8 text-left">Billing ID</th>
                <th class="py-4 px-8 text-left">Full Name</th>
                <th class="py-4 px-8 text-left">Email</th>
                <th class="py-4 px-8 text-left">Phone</th>
                <th class="py-4 px-8 text-left">Paid Amount</th>
                <th class="py-4 px-8 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-gray-800 text-gray-50">
                <td class="py-4 px-8">876e06027339ru139</td>
                <td class="py-4 px-8">Ahadul Islam Pinoy</td>
                <td class="py-4 px-8">ahadulislampinoy@gmal.co,</td>
                <td class="py-4 px-8">+880177737733</td>
                <td class="py-4 px-8">12776</td>
                <td class="py-4 px-8">
                  <div className="flex">
                    <button id="edit-btn-tooltip">
                      <PencilIcon class="h-6 w-6 inline-block mx-3" />
                    </button>
                    <span className="border-r-2 "></span>
                    <button id="dlt-btn-tooltip">
                      <TrashIcon class="h-6 w-6 inline-block mx-3" />
                    </button>
                    <Tooltip
                      className="bg-gray-500 text-gray-50 font-semibold opacity-100"
                      anchorId="edit-btn-tooltip"
                      content="Edit"
                    />
                    <Tooltip
                      className="bg-gray-500 text-gray-50 font-semibold opacity-100"
                      anchorId="dlt-btn-tooltip"
                      content="Delete"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Billing;
