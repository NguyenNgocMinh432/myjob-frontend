import { message } from "antd";
import axiosClient from "./axiosClient";

class FeedBackApi {
    create = (body) => {
        const url = '/feedbacks/create';
        // if (localStorage.getItem("token")) {
        return axiosClient.post(url, body).then((response) => {
            return response
        })
        // } else {
        //     return '';
        // }
    };
    getFeedback = (params) => {
        const url = '/feedbacks/getAll';
        return axiosClient.get(url).then((response) => {
            return response.data
        })
    }
    // checkLoginUser = (params) => {
    //     const url = '/checkUserLogin';
    //     if (localStorage.getItem("token")) {
    //         return axiosClient.get(url);
    //     } else {
    //         return '';
    //     }
    // };
}
const feedBackApi = new FeedBackApi();
export default feedBackApi;