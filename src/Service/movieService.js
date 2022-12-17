import axios from "axios"
import { BASE_URL, createConfig } from "./configURl"

export const movieService = {
    getDanhSachPhim: () => {
        return axios({
            url: `${BASE_URL}/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP05`,
            method: "GET",
            headers: createConfig(),
        })
    },

    getPhimTheoHeThongRap: () => {
        return axios({
            url: `${BASE_URL}/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP05`,
            method: "GET",
            headers: createConfig(),
        })
    }
}