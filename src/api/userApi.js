import { message } from "antd";
import axiosClient from "./axiosClient";

class UserApi {
    getAll = (params) => {
        const url = '/users';
        return axiosClient.get(url, { params });
    };
    getAllId = (params) => {
        const url = '/userId';
        return axiosClient.get(url, { params });
    };
    getOne = (params) => {
        const url = `/users/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    getUserSaveWork = (params) => {
        const url = `/getUserSaveWork/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    getUserCV = (params) => {
        const url = `/users/getcvuser`;
        return axiosClient.post(url, params).then(data => {
            return data
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    postuser = (params) => {
        const url = '/users';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm tài khoản thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    postfollows = (params) => {
        const url = '/follows';
        return axiosClient.post(url, params).then(data => {
            message.success("Follow Thành công!!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletefollows = (params) => {
        const url = '/follows/delete';
        return axiosClient.post(url, params).then(data => {
            message.success("unFollow Thành công!!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
    deleteuser = (id) => {
        const url = `/users/${id}`;
        return axiosClient.delete(url)
    };
    edituser = (params) => {
        const url = `/users/${params.id}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    postDevice = (device) => {
        const url = "/users/device";
        return axiosClient.post(url, device).then(data => {
            // message.success("đăng ký device thành công");
            console.log("thành công", data)
        }).catch(err => {
            message.error("Đăng ký device không thành công");
        })
    };
    userShare = (info) => {
        const url = "users/share";
        return axiosClient.post(url, info).then( data => {
            message.success("share bài tuyển dụng thành công");
        })
    };
    userCreateCV = (data) => {
        const url = "users/createcv";
        return axiosClient.post(url, data).then( data => {
            message.success("Tạo Cv thành công");
        })
    };
    userSendMail = (data) => {
        const url = "users/sendMail";
        return axiosClient.post(url, data).then(response => {
            message.success("Gửi mail liên hệ thành công");
        });
    };
    getNotification = (params) => {
        const url = "notifications";
        return axiosClient.get(url, { params });
    };
    editNotification = (params) => {
        const url = `/notifications/${params.id}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };

}
const userApi = new UserApi();
export default userApi;