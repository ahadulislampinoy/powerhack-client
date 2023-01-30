import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import SmallSpinner from "../../Components/SmallSpinner";

const DeleteModal = ({
  deleteModalOpen,
  closeModal,
  setDeleteModalOpen,
  selectedBilling,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(
        `http://localhost:5000/api/delete-billing/${selectedBilling._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("powerhack-token")}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message, {
          style: {
            background: "#363f4d",
            color: "#fff",
          },
        });
        setLoading(false);
        setDeleteModalOpen(false);
      })
      .catch((err) => {
        toast.error(err.message, {
          style: {
            background: "#363f4d",
            color: "#fff",
          },
        });
        setLoading(false);
      });
  };
  return (
    <Transition appear show={deleteModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-600/50 backdrop-blur p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex justify-between text-lg font-medium leading-6 text-gray-50"
                >
                  <span>Are you sure you want to delete?</span>
                  <span onClick={closeModal}>
                    <XMarkIcon className="h-5 w-5 text-gray-50 cursor-pointer inline-block" />
                  </span>
                </Dialog.Title>
                <div className="mt-5">
                  <button
                    onClick={handleDelete}
                    type="button"
                    className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg "
                  >
                    {loading ? <SmallSpinner /> : "Delete"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteModal;
