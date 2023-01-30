import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import SmallSpinner from "../../Components/SmallSpinner";
import AddNewModal from "./AddNewModal";
import "./Billing.css";
import DeleteModal from "./DeleteModal";
import Pagination from "./Pagination";
import UpdateModal from "./UpdateModal";

const Billing = () => {
  const [billings, setBillings] = useState([]);
  const [selectedBilling, setSelectedBilling] = useState({});
  let [addNewModalOpen, setAddNewModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  let [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [addNewLoading, setAddNewLoading] = useState(false);

  const closeModal = () => {
    setAddNewModalOpen(false);
    setDeleteModalOpen(false);
    // setUpdateModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(
        `https://powerhack-server.vercel.app/api/billing-list?page=${currentPage}`
      )
      .then((res) => {
        setBillings(res.data.totalBillings);
        setCount(res.data.count);
      });
  }, [currentPage, addNewModalOpen, deleteModalOpen, updateModalOpen]);

  const filteredBillings = billings.filter((billing) => {
    return (
      billing.name.toLowerCase().includes(searchTerm) ||
      billing.email.toLowerCase().includes(searchTerm) ||
      billing.phone.toLowerCase().includes(searchTerm)
    );
  });
  return (
    <section className="sm:mt-8 min-h-screen bg-gray-900 px-4 sm:px-6 md:px-10">
      <div className="flex w-full justify-center min-h-screen">
        <div className="overflow-auto">
          <h1 className="text-3xl w-full text-gray-100 font-bold mb-6">
            Billings
          </h1>
          <div className="sm:flex items-center justify-between mt-4 sm:space-x-2">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  className="bg-gray-700 text-gray-100 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Search"
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
                <div className="absolute top-0 flex items-center h-full ml-3">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-4 sm:mt-0 space-x-4">
              <button
                onClick={() => {
                  setAddNewModalOpen(true);
                }}
                className="bg-gradient-to-r from-red-600 to-red-800 text-gray-100 px-4 py-2 rounded-full font-semibold flex justify-center items-center sm:block"
              >
                Add New
                <PlusCircleIcon className="h-6 w-6 inline-block ml-2 text-gray-50" />
              </button>
            </div>
          </div>
          <table className="table border-separate space-y-6 overflow-auto lg:overflow-visible">
            <thead className="bg-gray-700 text-gray-100">
              <tr className="px-2">
                <th className="py-4 px-8 text-left">Billing ID</th>
                <th className="py-4 px-8 text-left">Full Name</th>
                <th className="py-4 px-8 text-left">Email</th>
                <th className="py-4 px-8 text-left">Phone</th>
                <th className="py-4 px-8 text-left">Paid Amount</th>
                <th className="py-4 px-8 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {!filteredBillings ? (
                <div>
                  <h1 className="text-lg text-red-500 font-bold">
                    {" "}
                    -- No Billing Found
                  </h1>
                </div>
              ) : (
                filteredBillings.map((billing) => (
                  <tr key={billing?._id} className="bg-gray-800 text-gray-50">
                    <td className="py-4 px-8">
                      {addNewLoading ? <SmallSpinner /> : billing?._id}
                    </td>
                    <td className="py-4 px-8">{billing?.name}</td>
                    <td className="py-4 px-8">{billing?.email}</td>
                    <td className="py-4 px-8">{billing?.phone}</td>
                    <td className="py-4 px-8">{billing?.amount}</td>
                    <td className="py-4 px-8">
                      <div className="flex">
                        <button
                          onClick={() => {
                            setUpdateModalOpen(true);
                            setSelectedBilling(billing);
                          }}
                          id="edit-btn-tooltip"
                        >
                          <PencilIcon className="h-6 w-6 inline-block mx-3" />
                        </button>
                        <span className="border-r-2 "></span>
                        <button
                          onClick={() => {
                            setDeleteModalOpen(true);
                            setSelectedBilling(billing);
                          }}
                          id="dlt-btn-tooltip"
                        >
                          <TrashIcon className="h-6 w-6 inline-block mx-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}

              <AddNewModal
                addNewModalOpen={addNewModalOpen}
                setAddNewModalOpen={setAddNewModalOpen}
                closeModal={closeModal}
                setAddNewLoading={setAddNewLoading}
              />
              <UpdateModal
                updateModalOpen={updateModalOpen}
                setUpdateModalOpen={setUpdateModalOpen}
                closeModal={closeModal}
                selectedBilling={selectedBilling}
                setSelectedBilling={setSelectedBilling}
              />
              <DeleteModal
                deleteModalOpen={deleteModalOpen}
                setDeleteModalOpen={setDeleteModalOpen}
                closeModal={closeModal}
                selectedBilling={selectedBilling}
              />
            </tbody>
          </table>
          <Pagination
            setCurrentPage={setCurrentPage}
            count={count}
            currentPage={currentPage}
          />
        </div>
      </div>
    </section>
  );
};

export default Billing;
