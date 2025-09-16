import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  role: null,
  tenant: null,
  plan: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (state, action) => {


      
      Object.assign(state, action.payload);

      console.log(JSON.parse(JSON.stringify(state)));
    },
    clearProfile: () => initialState,
  },
});

export const { updateProfile, clearProfile } = userSlice.actions;
export default userSlice.reducer;
