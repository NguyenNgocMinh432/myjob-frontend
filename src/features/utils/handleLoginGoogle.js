import firebase from "firebase/app";
import "firebase/storage";
import { Checkbox, message } from "antd";
import { useHistory } from "react-router-dom";
import loginApi from "../../api/loginApi";
import userApi from "../../api/userApi";
// const provider = new GoogleAuthProvider();
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
const auth = firebase.auth();
auth.languageCode = "it";
export const handleLoginWithGoogle = async (type = "login") => {
	firebase
		.auth()
		.signInWithPopup(provider)
		.then(async (result) => {
			/** @type {firebase.auth.OAuthCredential} */
			var credential = result.credential;

			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = credential.accessToken;
			// The signed-in user info.
			var user = result?.user;
			// IdP data available in result.additionalUserInfo.profile.
			// ...
			if (user.displayName && type === "register") {
				// history.push("/");
				const dataUserRegister = {
					email: user.email,
					name: user.displayName,
					avatar: user.photoURL,
					password: 0,
					status: 1,
				};
				await userApi.postuser(dataUserRegister);
				handleLoginWithApi(dataUserRegister);
				// Chuyển về trang home
				// window.location.href = "/";
				return true;
			} else if (user.displayName && type === "login") {
				// Lưu thông tin đăng nhập vào localStorage
				const dataUser = {
					email: user.email,
					name: user.displayName,
					avatar: user.photoURL,
					password: 0,
					status: 1
				};
				handleLoginWithApi(dataUser);
				localStorage.setItem("profile", JSON.stringify(dataUser));
				return true;
			} else {
			}
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
const handleLoginWithApi = async (data) => {
	const responseApiLogin = await loginApi.loginUser(data);
	try {
		console.log("responseApiLogin", responseApiLogin)
		localStorage.setItem("token", responseApiLogin);
		message.success("Đăng nhập thành công!");
		window.location.href = "/";
	} catch (err) {
		message.success("Đăng nhập không thành công!");
	}
};
