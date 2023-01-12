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
    dangKi: (dataUser) => {
        return axios({
            url: `${BASE_URL}/api/QuanLyNguoiDung/DangKy`,
            method: "POST",
            data: dataUser,
            headers: createConfig(),
        })
    },

    datVe: (thongTinDatVe) => {
        return axios({
            url: `${BASE_URL}/api/QuanLyDatVe/DatVe`,
            method: "POST",
            data: thongTinDatVe,
            headers: createConfig(),
          });
    }
}