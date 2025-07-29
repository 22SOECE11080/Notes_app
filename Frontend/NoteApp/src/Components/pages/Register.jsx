import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userRegister } from "../Store/user/userAction";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const res = await dispatch(userRegister(data));

    if (res.success) {
      toast.success(res.data.message || "Registration successful");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      toast.error(res.message);
    }

    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Register
        </h2>

        {/* Username Field */}
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
          className="w-full mb-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          className="w-full mb-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            minLength: { value: 6, message: "Min 6 characters" },
          })}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Register
        </button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};
