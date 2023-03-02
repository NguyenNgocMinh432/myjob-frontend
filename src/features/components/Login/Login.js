import { Checkbox, message } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
// import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import firebase from "firebase/app";
import "firebase/storage";
import "../../scss/Login/Login.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import loginApi from "../../../api/loginApi";
export default function Login() {
	// const provider = new GoogleAuthProvider();
	const provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
	const auth = firebase.auth();
	auth.languageCode = "it";

	const schema = yup.object().shape({
		userName: yup.string().email().required(),
		password: yup.string().min(4).max(20).required(),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const history = useHistory();
	const onSumit = async (data) => {
		await loginApi
			.loginCompany({
				email: data.userName,
				password: data.password,
				status: 1,
			})
			.then((res) => {
				if (res === "err") {
					loginApi
						.loginUser({
							email: data.userName,
							password: data.password,
							status: 1,
						})
						.then((data) => {
							if (data === "err") {
								message.error(
									"Sai tên đăng nhập hoặc mật khẩu!"
								);
							} else {
								localStorage.setItem("token", data);
								message.success("Đăng nhập thành công!");
								history.push("/");
							}
						});
				} else {
					localStorage.setItem("token", data);
					message.success("Đăng nhập thành công!");
					history.push("/");
				}
			});
	};

	const handleLoginWithGoogle = () => {
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				/** @type {firebase.auth.OAuthCredential} */
				var credential = result.credential;

				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				// IdP data available in result.additionalUserInfo.profile.
				// ...
                console.log(user);
			})
			.catch((error) => {
				// Handle Errors here.
                console.log(error);
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
			});
	};
	return (
		<div className="login">
			<div className="login__title">
				<h2>Đăng nhập My Jobs</h2>
			</div>
			<div className="login__box">
				<div className="line__login"></div>
				<div className="login__box__left">
					<form onSubmit={handleSubmit(onSumit)}>
						<div className="login__box__left__title">Tài khoản</div>
						<input
							type="text"
							{...register("userName")}
							placeholder="Email"
						/>
						<p className="text-danger">
							{errors.userName
								? "Email không đúng định dạng"
								: ""}
						</p>
						<div className="login__box__left__title">Mật khẩu</div>
						<input
							type="password"
							{...register("password")}
							placeholder="Mật khẩu"
						/>
						<p className="text-danger">
							{errors.password
								? "Mật khẩu ít nhất 4 ký tự và không quá 20 ký tự"
								: ""}
						</p>
						<Checkbox>Nhớ mật khẩu</Checkbox>
						<div className="login__box__left__button">
							<input type="submit" value="Đăng nhập" />
						</div>
					</form>
				</div>
				<div className="login__box__right">
					<div className="right">
						<div className="login__box__right__text">
							Hoặc đăng nhập với
						</div>
						<button className="fb">Đăng nhập với facebook</button>
						<button className="in" onClick={handleLoginWithGoogle}>
							Đăng nhập với google
						</button>
						<div className="login__box__right__text">
							Chưa có tài khoản?{" "}
							<Link to="/register">Đăng ký</Link> ở đây
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
