import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { companyData } from '../../admin/Slice/companySlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import companyApi from '../../../api/companyApi';
import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
export default function RegisterCompany() {
    const schema = yup.object().shape({
        userName: yup.string().email().required(),
        name: yup.string().required(),
        password: yup.string().min(4).max(20).required(),
        rePassword: yup.string().oneOf([yup.ref("password"), null])
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const banner = "https://phuoc-associates.com/wp-content/uploads/2019/10/5-Things-To-Keep-In-Mind-When-Opening-A-Company-In-Vietnam.jpg";
    const avatar = "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg"
    const address = "Hà Nội"
    const dispatch = useDispatch()
    const history = useHistory()
    const actionResult = async () => { await dispatch(companyData()) }

    const onSubmit = (data) => {
        const dataCompany = { address, banner, avatar, name: data.name, email: data.userName, password: data.password, status: 0 }
        const link = "http://localhost:666/companys"
        axios.post(link, dataCompany).then(ok => {
            if (ok.data.data === "email đã tồn tại!") {
                message.info("Email đã được đăng ký!")
            } else {
                message.success("Đăng ký tài khoản thành công!")
                setTimeout(() => {
                    actionResult();
                }, 700);
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
                    Email công ty
                </div>
                <input type="text" {...register("userName")} placeholder="Email" />
                <p className="text-danger">{errors.userName ? "Email không đúng định dạng" : ""}</p>
                <div className="register__box__left__title">
                    Tên công ty
                </div>
                <input type="text" {...register("name")} placeholder="Tên công ty" />
                <p className="text-danger">{errors.name ? "Tên côn ty không phù hợp" : ""}</p>
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
