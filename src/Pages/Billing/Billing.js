import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import AddNewModal from "./AddNewModal";
import "./Billing.css";
import DeleteModal from "./DeleteModal";
import Pagination from "./Pagination";
import UpdateModal from "./UpdateModal";

const Billing = () => {
  const [billings, setBillings] = useState([]);
  const [selectedBilling, setSelectedBilling] = useState(null);
  let [addNewModalOpen, setAddNewModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  let [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  const closeModal = () => {
    setAddNewModalOpen(false);
    setDeleteModalOpen(false);
    setUpdateModalOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/billing-list?page=${currentPage}`)
      .then((res) => {
        setBillings(res.data.totalBillings);
        setCount(res.data.count);
      });
  }, [currentPage, addNewModalOpen]);
  console.log(currentPage, "billings");

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
          <div className="flex items-center justify-between mt-4 space-x-2 ">
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
            <div className="flex items-center space-x-4">
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
          <table className="table border-separate space-y-6 overflow-auto lg:overflow-visible min-w-">
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
                <div>No Billing Found</div>
              ) : (
                filteredBillings.map((billing) => (
                  <tr key={billing?._id} className="bg-gray-800 text-gray-50">
                    <td className="py-4 px-8">{billing?._id}</td>
                    <td className="py-4 px-8">{billing?.name}</td>
                    <td className="py-4 px-8">{billing?.name}</td>
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
                        {/* <Tooltip
                  className="bg-gray-500 text-gray-50 font-semibold opacity-100"
                  anchorId="edit-btn-tooltip"
                  content="Edit"
                />
                <Tooltip
                  className="bg-gray-500 text-gray-50 font-semibold opacity-100"
                  anchorId="dlt-btn-tooltip"
                  content="Delete"
                /> */}
                      </div>
                    </td>
                  </tr>
                ))
              )}

              <AddNewModal
                addNewModalOpen={addNewModalOpen}
                setAddNewModalOpen={setAddNewModalOpen}
                closeModal={closeModal}
              />
              <UpdateModal
                updateModalOpen={updateModalOpen}
                setUpdateModalOpen={setUpdateModalOpen}
                closeModal={closeModal}
                selectedBilling={selectedBilling}
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
