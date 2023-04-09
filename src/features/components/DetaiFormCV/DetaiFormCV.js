import React, { useEffect, useState } from "react";
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
	return (
		<div>
			{/* <MenuNotHome /> */}
			<Breadcrumb name={data ? data.name : ""} />
			<div className="container">
				<div className="d-flex justify-content-end p-2">
					<button className="btn-primary p-2" onClick={handleClickCV}>
						Chọn Mẫu CV
					</button>
				</div>
			</div>
			<CV data={data} />
			<Footer />
		</div>
	);
}
