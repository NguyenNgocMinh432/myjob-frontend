import React, { useEffect, useState } from "react";
import { Button, Radio, Space, Divider } from 'antd';

import MenuNotHome from "../../MenuNotHome/MenuNotHome";
import Footer from "../../Home/Footer/Footer";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import InputFormCV from "./InputFormCV";
import { Validators } from "./Validator";
import JoditEditor from "jodit-react";
import { Row } from "antd";
import EditorCV from "../../../common/CV/EditorCV";
export default function InforCV() {
	const [value, setValue] = useState();
	const [target, setTarget] = useState("");
	const [education, setEducation] = useState("");
	const [prize, setPrize] = useState();
	const [certificate, setCertificate] = useState("");
	const [presenters, setPresenters] = useState("");
	const [experience, setExperience] = useState("");
	const [moreInformation, setMoreInformation] = useState("");
	const [activate, setActivate] = useState("");
	const [standard, setStandard] = useState(0);
	
	const listCreateCV = [
		{
			stt:  1,
			title: "Mục tiêu nghề nghiệp",
			target: target,
			handleValue: setTarget,
			status: (target === "" || target ==="<p><br></p>" ? false : true) 
		},
		{
			stt:  2,
			title: "Học vấn",
			target: education,
			handleValue: setEducation,
			status: (education === "" || education ==="<p><br></p>" ? false : true) 
		},
		{
			stt:  3,
			title: "Kinh nghiệm làm việc",
			target: experience,
			handleValue: setExperience,
			status: (experience === "" || experience ==="<p><br></p>" ? false : true) 
		},
		{
			stt:  4,
			title: "Hoạt động",
			target: activate,
			handleValue: setActivate,
			status: (activate === "" || activate ==="<p><br></p>" ? false : true) 
		},
		{
			stt:  5,
			title: "Chứng chỉ",
			target: certificate,
			handleValue: setCertificate,
			status: (certificate === "" || certificate ==="<p><br></p>" ? false : true) 
		},
		{
			stt:  6,
			title: "Dự án đã tham gia",
			target: presenters,
			handleValue: setPresenters,
			status: (presenters === "" || presenters ==="<p><br></p>" ? false : true) 
		},
		{
			stt:  7,
			title: "Thông tin thêm",
			target: moreInformation,
			handleValue: setMoreInformation,
			status: (moreInformation === "" || moreInformation ==="<p><br></p>" ? false : true) 
		},
	];
	useEffect(() => {
		let total = 0;
		for (let i = 0; i < listCreateCV.length; i++) {
			if (listCreateCV[i].status === true) {
				total+=1;
			}
		}
		setStandard(total);
	})
	const handelOnChange = (e) => {
		console.log(e);
		if(e.e === "<p><br></p>" || e.e === '') {
			setStandard(standard - 1);
		}
		// setStandard(e.stt)
		// setValue(e);
	};
	console.log("standard", standard);
	return (
		<div>
			{/* <MenuNotHome /> */}
			<Breadcrumb />
			<div className="heading">
				<div className="heading__title">
					<h3>Điền thông tin CV</h3>
				</div>
				<div className="heading__hr"></div>
			</div>
			<div className="container ">
				{/* <InputFormCV
					onChange={handelOnChange}
					validators={[
						{ check: Validators.number, message: "Số" },
						{ check: Validators.required, message: "Bạn chưa nhập thông tin!" },
					]}
					value={value}
					placeholder="hihi"
					type="number"
					helpText="cái này để nhập input"
					label="huhu"
				/> */}
				{listCreateCV.map((item, index) => {
					return (
						<Row className="mt-3" key={index}>
							<div className="col-lg-2 d-flex justify-content-center align-items-center">
								<input type="radio" name="" checked = {item.status === true && true}/>
								<span className="p-2 fw-bold">{`${standard}/${listCreateCV.length}`}</span>
							</div>
							<div className="col-lg-10">
								<EditorCV
									stt={item.stt}
									key={item.stt}
									title={item.title}
									target={item.target}
									setTarget={item.handleValue}
									handelOnChange={handelOnChange}
								/>
							</div>
						</Row>
					);
				})}
				<div className="w-100 d-flex justify-content-end mt-3 mb-3">
					<Button type="primary">Thêm</Button>
				</div>
			</div>
			<Footer />
		</div>
	);
}
