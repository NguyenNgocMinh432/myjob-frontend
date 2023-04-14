import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Footer from "../Home/Footer/Footer";
import MenuNotHome from "../MenuNotHome/MenuNotHome";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import formCVApi from "../../../api/formCVApi";
import CV from "./CV/CV";
export default function DetaiFormCV() {
	const { id } = useParams();
	const [data, setData] = useState();
	const history = useHistory();
	const params = useParams();

	// Default export is a4 paper, portrait, using millimeters for units
	const doc = new jsPDF();

	const getApi = async () => {
		return await formCVApi.getOne(id).then((data) => {
			setData(data);
		});
	};
	useEffect(() => {
		getApi();
		window.scrollTo(0, 0);
	}, []);
	const handleClickCV = () => {
		localStorage.setItem("CVSelector", params.id);
		localStorage.setItem("htmlCV", JSON.stringify(data.content));
		history.push("/inforCV");
	};
	const handleDownCV = () => {
		const getHtml = document.querySelector(".preview_cv").innerHTML;
		// Chuyển đổi HTML thành PDF
		// Chuyển đổi HTML thành PDF
		doc.html(getHtml, {
			callback: function (doc) {
				console.log(doc);
			doc.setTextColor("#FFFFFF");
			// Lưu tệp PDF
			doc.save("my-pdf.pdf");

			},
			x: 15,
			y: 15,
			width: 170, //target width in the PDF document
			windowWidth: 650 //window width in CSS pixels
		});
	}
	return (
		<div>
			{/* <MenuNotHome /> */}
			<Breadcrumb name={data ? data.name : ""} />
			<div className="container">
				<div className="d-flex justify-content-end p-2">
					<button className="btn-primary p-2 w-10" onClick={handleClickCV}>
						Chọn Mẫu CV
					</button>
				</div>
				<div className="d-flex justify-content-end p-2 ">
					<button className="btn-primary p-2" onClick={handleDownCV}>
						Tải CV
					</button>
				</div>
			</div>
			<CV data={data} />
			<Footer />
		</div>
	);
}
