import axios from "axios"
import { BASE_URL, createConfig } from "./configURl"

export const userService  = {
    postDangNhap: (dataUser) => { 
        return axios({
            url: `${BASE_URL}/api/QuanLyNguoiDung/DangNhap`,
            method: "POST",
            data: dataUser,
            headers: createConfig(),
        })
    },

}