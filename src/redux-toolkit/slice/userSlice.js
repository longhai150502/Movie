import { createSlice } from "@reduxjs/toolkit";
import { userLocalService } from "../../Service/localStorageService";

const initialState = {
    userInfor: userLocalService.get(),
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUserInfor: (state, action) => {
            state.userInfor = action.payload;
        },
    }
})

export const { setUserInfor } = userSlice.actions

export default userSlice.reducer;