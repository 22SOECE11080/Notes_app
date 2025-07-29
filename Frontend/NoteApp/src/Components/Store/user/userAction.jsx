import { registerUser } from "./userSlice";
import axios from "../../api/axiosconfig";

export const userRegister = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth/register", data);
    dispatch(registerUser(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Registration failed. Please try again.",
    };
  }
};

export const userLogin = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth/login", data);
    dispatch(registerUser(response.data));
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Login failed. Please try again.",
    };
  }
};
