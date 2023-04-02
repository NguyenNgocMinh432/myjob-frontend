import React from "react";
import { useHistory } from "react-router";
import "../../../scss/CreateCV/ListCV.scss";
import SpinLoad from "../../Spin/Spin";
import { Link } from "react-router-dom";
import { checkLoginUser } from "../../../container/Functionjs";
import { message } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import checkLoginApi from "../../../../api/checkLogin";
export default function ListCV({ data, loading }) {
	const [user, setUser] = useState();
	const [valueSearch, setValueSearch] = useState();
	const [dataCV, setDataCV] = useState(data?.rows);
	const history = useHistory();
	useEffect(() => {
		// checkLoginApi
		// 	.checkLogin()
		// 	.then((ok) => {
		// 		if (ok.data.user.type === "user") {
		// 			setUser(ok.data.user.id);
		// 		}
		// 	})
		// 	.catch((err) => {
		const getUserFromLocalStorage = localStorage.getItem("user");
		setUser(JSON.parse(getUserFromLocalStorage));
		// });
	});

	const onClickInforCV = () => {
		if (user) {
			history.push("/inforCV");
		} else {
			message.warning("Bạn chưa đăng nhập tài khoản người dùng!");
		}
	};
	const handleSearchCV = (e) => {
		const dataCV = data.rows;
		const newData = dataCV.filter(
			(row) =>
				row.name.toLowerCase().trim() ===
				valueSearch.toLowerCase().trim()
		);
		setDataCV(newData);
	};
	return (
		<div className="listCv">
			<div className="heading">
				<div className="heading__title">
					<h3>Tạo Cv</h3>
				</div>
				<div className="heading__hr"></div>
			</div>
			<div className="container mb-5">
				<div className="div-btn-cv d-flex justify-content-between">
					<div class="search">
						<input
							type="text"
							name=""
							id=""
							placeholder="Tìm kiếm Cv ....."
							class="search__input"
							onChange={(e) => {
								setValueSearch(e.target.value);
							}}
						/>
						<button
							type="submit"
							class="search__button"
							tabIndex="-1"
							onClick={handleSearchCV}
						>
							Search
						</button>
					</div>
					<Link className="btn-infor-cv" onClick={onClickInforCV}>
						Điền thông tin CV
					</Link>
				</div>
				<div className="row">
					<div className="col-md-0"></div>
					<div className="col-md-10">
						<div className="row">
							{loading ? (
								<SpinLoad />
							) : (
								dataCV?.map((ok, index) => (
									<div
										className="col-md-4 d-flex"
										key={index}
									>
										<Link to={`/detaiFormCV/${ok.id}`}>
											<div className="box">
												<div className="box-img">
													<img
														src={ok.avatar}
														alt=""
													/>
												</div>
												<div className="box-tag">
													{ok?.tags.map((oki) => (
														<p>{oki.name}</p>
													))}
												</div>
												<div className="box-name">
													<p>{ok.name}</p>
												</div>
												<div className="box-color">
													<div className="color"></div>
													<div className="color"></div>
													<div className="color"></div>
													<div className="color"></div>
													<div className="color"></div>
												</div>
											</div>
										</Link>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
