import { Image } from "antd";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import userApi from "../../../../api/userApi";
import "../../../scss/DetailCompany/BannerCompany.scss";
import checkLoginApi from "../../../../api/checkLogin";
export default function BannerCompany({ avatar, banner, name, address }) {
	const [follows, setFollows] = useState(false);
	const [callApi, setApi] = useState(false);
	const user = JSON.parse(localStorage.getItem("user"));
	const checkFollows = user?.follows;
	const userId = user?.id;
	const currentUrl = window.location.pathname;
	const converUrl = currentUrl.split("/");
	const idUserFollow = Number(converUrl[converUrl.length - 1]);
	useEffect(() => {
		if (Array.isArray(checkFollows) && checkFollows.length > 0) {
			const followUser = checkFollows.filter((item,index) => {
				return Number(item) === Number(idUserFollow)
			})
			if (followUser && followUser.length > 0) {
				setFollows(true);
			}
		} else {
			setFollows(false);
		}
	}, [idUserFollow, callApi])
	const handleFollowUser = async () => {
		if (user) {
			const body = {
				user_id: userId,
				user_id_follows: idUserFollow,
			};
			await userApi.postfollows(body).then((data) => {
				setApi(prev => !prev)
				setFollows(true);
			});
			// Gọi lần nữa api check Info để lưu thông tin lại
			checkLoginApi.checkLogin().then((ok) => {
				localStorage.setItem("user", JSON.stringify(ok.data.user));
			});
		} else {
			message.error("Bạn cần đăng nhập để có thể follow người dùng này");
		}
	};
	return (
		<div
			className="bannerCompany"
			style={{
				background: `url(${banner}) repeat center`,
				backgroundSize: "cover",
			}}
		>
			<div className="bannerCompany__content">
				<div className="bannerCompany__content__img">
					<Image src={avatar} height="100%" />
				</div>
				<div className="company__margin d-flex justify-content-between w-75 align-items-center">
					<div>
						<div className="bannerCompany__content__title">
							{name}
						</div>
						<div className="bannerCompany__content__address">
							{address}
						</div>
					</div>
					<div>
						{/* {user && user.role === "user" && ( */}
						{!follows ? (
							<button
								id="follow-button"
								onClick={handleFollowUser}
							>
								+ Follow
							</button>
						) : (
							<button
								id="follow-button"
								// onClick={handleFollowUser}
							>
								unFollow
							</button>
						)}

						{/* )} */}
					</div>
				</div>
			</div>
		</div>
	);
}
