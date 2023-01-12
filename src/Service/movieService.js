import axios from "axios"
import { BASE_URL, createConfig, https } from "./configURl"

export const movieService = {
    getDanhSachPhim: () => {
        // return axios({
        //     url: `${BASE_URL}/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP05`,
        //     method: "GET",
        //     headers: createConfig(),
        // })
        return https.get("api/QuanLyPhim/LayDanhSachPhim?maNhom=GP05")
    },

    getPhimTheoHeThongRap: () => {
        // return axios({
        //   url: `${BASE_URL}/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP05`,
        //   method: "GET",
        //   headers: createConfig(),
        // });
        return https.get("api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP05")
      },
}