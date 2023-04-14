import React, { useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Footer from "../Home/Footer/Footer";
import Menu from "../MenuNotHome/MenuNotHome";
import BannerCandidate from "./BannerCandidate/BannerCandidate";
import CandidateContent from "./CandidateContent/CandidateContent";
import { useParams } from "react-router-dom";
import userApi from "../../../api/userApi";
import SpinLoad from "../Spin/Spin";
import workApplyApi from "../../../api/workApplyApi";

export default function DetailCandidate() {
	const { id } = useParams();
	const [data, setData] = useState();
	const [ dataCV, setDataCV ] = useState();
	const [infoCV, setInfoCV ] = useState();
	const getApi = async () => {
		return await userApi.getOne(id).then((data) => {
			setData(data);
		});
	};
	// Lấy Cv mà đã ứng tuyển với công ty.
	const getCVfromDB = async () => {
		return await workApplyApi.getOne(id).then((data) => {
			setDataCV(data);
		})
	}
	// Lấy thông tin cv của user
	const getCvUser = async () => {
		return await userApi.getUserCV({
			userId:id
		}).then((data) => {
			setInfoCV(data);
			console.log("info", data);
		})
	}
	useEffect(() => {
		getCvUser();
		getApi();
		getCVfromDB();
		window.scrollTo(0, 0);
	}, []);
	return (
		<div>
			{/* <Menu /> */}
			{data ? (
				<div>
					<Breadcrumb name={data.name} />
					<BannerCandidate
						avatar={data.avatar}
						banner={data.banner}
						name={data.name}
						address={data.address}
					/>
					<CandidateContent data={data} dataCV={dataCV} infoCV={infoCV} />
				</div>
			) : (
				<SpinLoad />
			)}
			<Footer />
		</div>
	);
}
