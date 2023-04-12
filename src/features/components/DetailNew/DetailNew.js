import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import newApi from "../../../api/newApi";
import Footer from "../Home/Footer/Footer";
import BannerNew from "./BannerNew/BannerNew";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import New from "./New/New";
import workApi from "../../../api/workApi";

export default function DetailNew() {
	const { id } = useParams();
	const [news, setNews] = useState();
	const [dataNews, setDataNews] = useState();
	const [dataWorkSuggest,setDataWorkSuggest] = useState([]);
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(async () => {
		if (id) {
			setNews(
				await newApi.getOne(id).then((data) => {
					console.log(data);
					return data;
				})
			);
		}
		setDataNews( await newApi.getAll().then((data) => {
			return data;
		}))
		window.scrollTo(0, 0);
	}, []);

	useEffect(async() => {
		const data = await workApi.suggest({userId:user.id});
		if (data) {
			setDataWorkSuggest(data.data.rows);
		}
	},[news, dataNews])

	return (
		<div>
			{!news ? (
				""
			) : (
				<div>
					{/* <Menu /> */}
					<Breadcrumb name={news.name} />
					<BannerNew img={news.avatar} title={news.name} tags={news.tags} />
					<New content={news.content} data={dataNews} dataWorkSuggest={dataWorkSuggest} />
					<Footer />
				</div>
			)}
		</div>
	);
}
