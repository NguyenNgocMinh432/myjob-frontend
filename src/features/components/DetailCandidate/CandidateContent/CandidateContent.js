import React from "react";
import renderHTML from "react-render-html";
import { Link } from "react-router-dom";
import { checkDateCompany } from "../../../container/Functionjs";

import "../../../scss/DetailCandidate/CandidateContent.scss";
import KeyTag from "../../Jobs/ListJobs/KeyTag";
import { useState } from "react";
import userApi from "../../../../api/userApi";
import { message } from "antd";
import workApplyApi from "../../../../api/workApplyApi";
import { BorderBottomOutlined } from "@ant-design/icons";
export default function CandidateContent({ data, dataCV, infoCV }) {
	// Check user đã đăng nhập hay chưa
	const user = JSON.parse(localStorage.getItem("user"));
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [content, setContent] = useState();
	const [title, setTitle] = useState();
	const [date, setDate] = useState();
	// Xử lý phần sendEmail
	const handleSendMail =  async(e) => {
		e.preventDefault();
		if (user) {
			const dataSendEmail = {
				yourEmail: data.email,
				content_email:content,
				title,
				date:date
				// name
			}
			await userApi.userSendMail(dataSendEmail);
			await workApplyApi.editStatusCvWork({id: data && data.id});
		} else {
			message.error("Bạn chưa đăng nhập!!!")
		}
	}

	return (
		<div className="candidateContent">
			<div className="container">
				<div className="row">
					<div className="col-md-8">
						<div className="candidate__box">
							<div className="candidate__box__title">Kỹ năng</div>
							<div className="candidate__box__skill ">
								<div className="candidateTag d-flex">
									{data?.tags.length > 0 ? (
										data.tags.map((ok, index) => (
											<Link to="" key={index}>{ok.name}</Link>
										))
									) : (
										<span className="text-danger">
											Ứng viên chưa cập nhập
										</span>
									)}
								</div>
							</div>
						</div>
						<div className="candidate__box">
							<div className="candidate__box__title">
								Giới thiệu
							</div>
							<div className="candidate__box__content">
								{data.introduce
									? renderHTML(data.introduce)
									: ""}
							</div>
						</div>
						
						<div className="candidate__box">
							<div className="candidate__box__title">
								Mục tiêu
							</div>
							<div className="candidate__box__content">
								{infoCV && infoCV.data.target
									? renderHTML(infoCV.data.target)
									: ""}
							</div>
						</div>

						<div className="candidate__box">
							<div className="candidate__box__title">
								Học vấn
							</div>
							<div className="candidate__box__content">
								{infoCV && infoCV.data.education
									? renderHTML(infoCV.data.education)
									: ""}
							</div>
						</div>

						<div className="candidate__box">
							<div className="candidate__box__title">
								Kinh nghiệm
							</div>
							<div className="candidate__box__content">
								{infoCV && infoCV.data.experience
									? renderHTML(infoCV.data.experience)
									: ""}
							</div>
						</div>

						<div className="candidate__box">
							<div className="candidate__box__title">
								Chứng chỉ
							</div>
							<div className="candidate__box__content">
								{infoCV && infoCV.data.certificate
									? renderHTML(infoCV.data.certificate)
									: ""}
							</div>
						</div>

						<div className="candidate__box">
							<div className="candidate__box__title">
								Sản phẩm đã tham gia
							</div>
							<div className="candidate__box__content">
								{infoCV && infoCV.data.project
									? renderHTML(infoCV.data.project)
									: ""}
							</div>
						</div>

						<div className="candidate__box">
							<div className="candidate__box__title">
								CV online
							</div>
							<a href={
								dataCV && dataCV.length > 0 ? (
									dataCV[dataCV.length - 1].link
								) : ""
							}
							target="_blank"
							>
								{
									dataCV && dataCV.length > 0 ? (
										dataCV[dataCV.length - 1].link
									) : ""
								}
							</a>
						</div>
					</div>
					<div className="col-md-4 ">
						<div className="candidate__box">
							<div className="candidate__box__title">
								Thông tin
							</div>
							<div className="candidate__box__detail">
								<div className="candidate__box__detail__icon">
									<i className="fas fa-calendar-alt"></i>
								</div>
								<div>
									<div className="candidate__box__detail__title">
										Ngày sinh
									</div>
									<div className="candidate__box__detail__content">
										06/03/2021
									</div>
								</div>
							</div>
							<div className="candidate__box__detail">
								<div className="candidate__box__detail__icon">
									<i className="fas fa-sign-in-alt"></i>
								</div>
								<div>
									<div className="candidate__box__detail__title">
										Tham gia
									</div>
									<div className="candidate__box__detail__content">
										{checkDateCompany(data.createdAt)}
									</div>
								</div>
							</div>
							<div className="candidate__box__detail">
								<div className="candidate__box__detail__icon">
									<i className="fas fa-map-marker-alt"></i>
								</div>
								<div>
									<div className="candidate__box__detail__title">
										Địa điểm
									</div>
									<div className="candidate__box__detail__content">
										{data.address}
									</div>
								</div>
							</div>
							<div className="candidate__box__detail">
								<div className="candidate__box__detail__icon">
									<i className="fas fa-envelope"></i>
								</div>
								<div>
									<div className="candidate__box__detail__title">
										Email
									</div>
									<div className="candidate__box__detail__content">
										{data.email}
									</div>
								</div>
							</div>
							<div className="candidate__box__detail">
								<div className="candidate__box__detail__icon">
									<i className="fas fa-phone"></i>
								</div>
								<div>
									<div className="candidate__box__detail__title">
										Điện thoại
									</div>
									<div className="candidate__box__detail__content">
										{data.phone ? (
											data.phone
										) : (
											<span className="text-danger">
												Chưa cập nhật
											</span>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="candidate__box">
							<div className="candidate__box__title">
								Liên hệ ngay
							</div>
							<div className="candidate__box__email">
								<form>
									{/* <input
										type="text"
										name="yourName"
										placeholder="Tên của bạn"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/> */}
									{/* <input
										type="text"
										name="yourEmail"
										placeholder="Email của bạn"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/> */}
									<input
										type="text"
										name="title"
										placeholder="Tiêu đề"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
									<input
										type="text"
										name="content_email"
										placeholder="Nội dung mail"
										value={content}
										onChange={(e) => setContent(e.target.value)}
									/>
									<input
										type="date"
										name="content_email"
										placeholder="Nội dung mail"
										value={content}
										style={{
											width:"100%",
											height:"40px",
											marginBottom:"20px",
											BorderRadius:"15px",
											padding: "15px"
										}}
										onChange={(e) => setDate(e.target.value)}
									/>
									<input type="submit" value="Gửi" onClick={handleSendMail}/>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
