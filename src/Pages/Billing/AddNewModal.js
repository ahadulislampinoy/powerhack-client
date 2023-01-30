import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SmallSpinner from "../../Components/SmallSpinner";
import { AuthContext } from "../../Context/AuthProvider";

const AddNewModal = ({
  addNewModalOpen,
  closeModal,
  setAddNewModalOpen,
  setAddNewLoading,
}) => {
  const { user, setPaidTotal } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setAddNewLoading(true);
    setLoading(true);
    setPaidTotal(data?.amount);
    const billingData = {
      name: data?.name,
      email: data?.email,
      addedByUserEmail: user?.email,
      phone: data?.phone,
      amount: data?.amount,
      time: new Date().toLocaleString(),
    };
    axios
      .post(`http://localhost:5000/api/add-billing`, billingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("powerhack-token")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message, {
          style: {
            background: "#363f4d",
            color: "#fff",
          },
        });
        reset();
        setLoading(false);
        setAddNewModalOpen(false);
        setAddNewLoading(false);
      })
      .catch((err) => {
        toast.error(err.message, {
          style: {
            background: "#363f4d",
            color: "#fff",
          },
        });
        setLoading(false);
        setAddNewLoading(false);
      });
  };
  return (
    <Transition appear show={addNewModalOpen} as={Fragment}>
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
                  className="flex justify-between text-lg font-medium leading-6 text-gray-50 capitalize"
                >
                  <span>Add new billing</span>
                  <span onClick={closeModal}>
                    <XMarkIcon className="h-5 w-5 text-gray-50 cursor-pointer inline-block" />
                  </span>
                </Dialog.Title>
                <div className="text-sm text-gray-50 mt-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex flex-col">
                      <label
                        className="text-base font-semibold text-gray-50 mb-1"
                        htmlFor="email"
                      >
                        Full Name
                      </label>
                      <input
                        className="border border-gray-400 rounded-md bg-gray-700/60 px-3 py-2 "
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your Full Name"
                        {...register("name", {
                          required: true,
                          minLength: {
                            value: 8,
                            message: "Full Name must be at least 8 characters",
                          },
                        })}
                      />
                      {errors?.name && (
                        <p className="text-red-300 font-semibold mt-1">
                          {errors?.name?.message
                            ? errors?.name?.message
                            : "Full Name is required"}
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
                        <p className="text-red-300 font-semibold mt-1">
                          {errors?.email?.message
                            ? errors?.email?.message
                            : "Email adress is required"}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="text-base font-semibold text-gray-50 mb-1"
                        htmlFor="phone"
                      >
                        Phone
                      </label>
                      <input
                        className="border border-gray-400 rounded-md bg-gray-700/60 px-3 py-2"
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="Enter your Phone Number"
                        {...register("phone", {
                          required: true,
                          pattern: {
                            value: /^01\d{9}$/,
                            message:
                              "Phone number must be 11 digits and start with 01",
                          },
                        })}
                      />
                      {errors?.phone && (
                        <p className="text-red-300 font-semibold mt-1">
                          {errors?.phone?.message
                            ? errors?.phone?.message
                            : "Phone is required"}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="text-base font-semibold text-gray-50 mb-1"
                        htmlFor="amount"
                      >
                        Amount
                      </label>
                      <input
                        className="border border-gray-400 rounded-md bg-gray-700/60 px-3 py-2"
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Enter your payable amount"
                        {...register("amount", {
                          required: true,
                          max: {
                            value: 9999999,
                            message: "Amount must be less than 9999999",
                          },
                        })}
                      />
                      {errors?.amount && (
                        <p className="text-red-300 font-semibold mt-1">
                          {errors?.amount?.message
                            ? errors?.amount?.message
                            : "Amount is required"}
                        </p>
                      )}
                    </div>
                    <div>
                      <button className="w-full bg-gradient-to-r from-rose-800 to-rose-600 text-gray-50 rounded-md p-2">
                        {loading ? <SmallSpinner /> : "Add Billing"}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddNewModal;
