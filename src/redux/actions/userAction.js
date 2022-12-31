
import { message } from "antd"
import { userLocalService } from "../../Service/localStorageService"
import { userService } from "../../Service/userService"
import { SET_USER_INFOR } from "../constant/userContant"

export const setLoginAction = (value) => {
    return {
        type: SET_USER_INFOR,
        payload: value,
    }
}

export const setLoginActionService = (userForm, onSuccess) => { 
    return (dispatch) => {
        userService.postDangNhap(userForm)
            .then((res) => {
                message.success("Đăng nhập thành công")
                userLocalService.set(res.data.content)
                dispatch({
                    type: SET_USER_INFOR,
                    payload: res.data.content
                })
                onSuccess();
            }).catch((err) => {
                console.log(err);
                message.error("Đăng nhập thất bại")
            });
    }
 }