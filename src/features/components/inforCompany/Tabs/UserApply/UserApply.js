import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import workApplyApi from "../../../../../api/workApplyApi";
import "../../../../scss/inforCompany/UserApply.scss";
import { Popover } from "antd";
import SpinLoad from "../../../Spin/Spin";
export default function UserApply({ id }) {
	const [data, setData] = useState();
	const getApi = async () => {
		await workApplyApi.checkWorkApply(id).then((data) => {
			console.log("check user ứng tuyển", data.works);
			setData(data.works);
		});
	};
	console.log(data);
	useEffect(() => {
		getApi();
	}, []);
	const [showMess, setShowMess] = useState(false);

	const handleSendEmail = () => {
		alert("gửi tin nhắn thành côgn")
	}
	
	return (
		<div className="userApply">
			<div className="heading">
				<div className="heading__title">
					<h3>Ứng viên ứng tuyển</h3>
				</div>
				<div className="heading__hr"></div>
			</div>

			<div className="content">
				{!data ? (
					<SpinLoad />
				) : (
					data.map((ok, index) => (
						<div className="content___box" key={index}>
							<div className="content___box--title">
								<Link to={`jobs/work/${ok?.id}`} className="text-dark">
									{ok?.name}
								</Link>
							</div>
							<div className="hr"></div>
							<div className="content___box---user">
								<div className="row">
									{ok.workapply2.length === 0 ? (
										<p className="text-danger">Chưa có ứng viên ứng tuyển</p>
									) : (
										ok.workapply2.map((oki, index) => (
											<div className="col-md-12" key={index}>
												<div className="d-flex">
													<div className="content___box---user---img">
														<img src={oki?.avatar} title={oki?.name} width={150} />
													</div>
													<div className="content___box---user---infor position-relative">
														<table>
															<tr>
																<td className="td">Tên người dùng</td>
																<td>
																	<Link to={`candidates/${oki.id}`}>{oki.name}</Link>
																</td>
															</tr>
															<tr>
																<td className="td">Địa chỉ</td>
																<td>{oki.address}</td>
															</tr>
															<tr>
																<td className="td">Email</td>
																<td>{oki.email}</td>
															</tr>
															<tr>
																<td className="td">Điện thoại</td>
																<td>{oki.phone}</td>
															</tr>
															<tr>
																<td className="td">Giới tính</td>
																<td>{oki.male}</td>
															</tr>
														</table>
														{oki?.workapplies?.link ? (
															<button
																className="btn-link"
																onClick={() => {
																	window.open(oki?.workapplies?.link);
																}}
															>
																xem cv
															</button>
														) : (
															""
														)}
														{/* Trạng thái */}
														<div className="d-flex justify-content-end">
															<span className="fw-bold">Trạng thái: </span>
															<span>
																{
																	oki?.workapplies?.status === 0 ? "Chưa xem" : "Đợi phản hồi"
																}
															</span>
														</div>
														{/* <Popover content={oki?.workApplies?.message} title="Lời nhắn">
															<button className="btn-message" onClick={handleSendEmail}>
																<i className="fas fa-comment-dots"></i>
															</button>
														
														</Popover> */}
													</div>
												</div>
											</div>
										))
									)}
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
