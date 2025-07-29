import axios from "../../api/axiosconfig";
import { loadNotes } from "./noteSlice";

export const getAllNotes = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/notes/getAllNotes");
    dispatch(loadNotes(response.data.payload));
  } catch (error) {
    console.log(error, { msg: "not success" });
  }
};
