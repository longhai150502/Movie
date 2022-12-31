import { userLocalService } from "../../Service/localStorageService"
import { SET_SIGN_IN, SET_USER_INFOR } from "../constant/userContant"

const initialState = {
    userInfor: userLocalService.get(),
}

// eslint-disable-next-line import/no-anonymous-default-export
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case SET_USER_INFOR:
    return { ...state, userInfor:payload };
  
  default:
    return state
  }
}
