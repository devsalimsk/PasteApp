import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};
export const pasteSlice = createSlice({
  name: "paste",
  initialState, 
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      // Check if a paste with the same title or _id already exists
      const exists = state.pastes.some(
        (existingPaste) => existingPaste.title === paste.title || existingPaste._id === paste._id
      );

      if (exists) {
        toast.error("Paste with the same title or ID already exists");
      } else {
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste created successfully");
      }
    },
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex(
        (paste) => paste._id === updatedPaste._id
      );

      if (index !== -1) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      } else {
        toast("Paste not found for update");
      }
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast("All pastes have been reset");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      state.pastes = state.pastes.filter((paste) => paste._id !== pasteId);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste removed successfully");
    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
