import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

// Define a type since in real world application, there could be other attributes such as username.
interface UserState {
    id: number;
}

// Assume that user with `id:1` has logged in.
const initialState: UserState = {
    id: 1,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},
});

export const selectCurrentUserId = (state: RootState)=>state.auth.id;
export default authSlice.reducer;