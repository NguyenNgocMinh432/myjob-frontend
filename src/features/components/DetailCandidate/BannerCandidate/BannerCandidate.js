import { Image } from "antd";
import { message } from "antd";
import React from "react";
import "../../../scss/DetailCompany/BannerCompany.scss";
export default function BannerCompany({ avatar, banner, name, address }) {
	const user = JSON.parse(localStorage.getItem("user"));
	const handleFollowUser = () => {
		if (user) {
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
						{user && user.role === "user" && (
							<button
								id="follow-button"
								onClick={handleFollowUser}
							>
								+ Follow
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
