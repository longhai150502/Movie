import axios from "axios";
import { userLocalService } from "./localStorageService"
import { store_toolkit } from '../index'
import { setLoadingOff, setLoadingOn } from "../redux-toolkit/slice/spinnerSlice";


export const BASE_URL = "https://movienew.cybersoft.edu.vn"

export const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwNSIsIkhldEhhblN0cmluZyI6IjI4LzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NTIzMjAwMDAwMCIsIm5iZiI6MTY2MjMxMDgwMCwiZXhwIjoxNjg1Mzc5NjAwfQ.FtGbsXl4qyqTRfJrunro0mQ7b-tNs8EWbhb7JDTzloE";

export const createConfig = () => {
    return {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + userLocalService.get()?.accessToken,
        
    }
}

export const https = axios.create({
    baseURL: BASE_URL,
    headers: createConfig(),
  });

  https.interceptors.request.use(function (config) {
    // Do something before request is sent
    store_toolkit.dispatch(setLoadingOn())
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
https.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store_toolkit.dispatch(setLoadingOff());
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });