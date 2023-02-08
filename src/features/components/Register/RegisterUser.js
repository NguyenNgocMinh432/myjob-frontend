import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { message } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
export default function RegisterUser() {
    const schema = yup.object().shape({
        userName: yup.string().email().required(),
        name: yup.string().required(),
        password: yup.string().min(4).max(20).required(),
        rePassword: yup.string().oneOf([yup.ref("password"), null])
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const banner = "https://static.ohga.it/wp-content/uploads/sites/24/2020/02/lavoro-precario-convivere.jpg"
    const avatar = "https://vn-live-02.slatic.net/p/49c931dd11cde1e48fee9a07424a22dc.jpg"
    const address = "Hà Nội"
    const history = useHistory()
    const onSubmit = (data) => {
        const asUserRole = [{ roleId: 2 }]
        const dataUser = { address, banner, avatar, name: data.name, email: data.userName, password: data.password, asUserRole, status: 1 }
        const link = "http://localhost:666/users"
        axios.post(link, dataUser).then(ok => {
            if (ok.data.data === "email đã tồn tại!") {
                message.info("Email đã được đăng ký!")
            } else {
                message.success("Đăng ký tài khoản thành công!")
                history.push("/login");
            }
        }).catch(er => {
            console.log(er);
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="register__box__left__title">
                    Email đăng nhập
                </div>
                <input type="text" {...register("userName")} placeholder="Email" />
                <p className="text-danger">{errors.userName ? "Email không đúng định dạng" : ""}</p>
                <div className="register__box__left__title">
                    Tên người dùng
                </div>
                <input type="text" {...register("name")} placeholder="Tên người dùng" />
                <p className="text-danger">{errors.name ? "Tên người dùng khống phù hơp" : ""}</p>
                <div className="register__box__left__title">
                    Mật khẩu
                </div>
                <input type="password" {...register("password")} placeholder="Mật khẩu" />
                <p className="text-danger">{errors.password ? "Mật khẩu ít nhất 4 ký tự và không quá 20 ký tự" : ""}</p>
                <div className="register__box__left__title">
                    Nhập lại mật khẩu
                </div>
                <input type="password" {...register("rePassword")} placeholder="Mật khẩu" />
                <p className="text-danger">{errors.rePassword ? "Mật khẩu không trùng khớp" : ""}</p>
                <div className="register__box__left__button">
                    <input type="submit" value="Đăng ký" />
                </div>
            </form>
        </>
    )
}
