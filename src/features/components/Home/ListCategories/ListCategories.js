import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { typeWorkData } from "../../../admin/Slice/typeWorkSlice";
import { GetCategoryHome } from "../../../container/Functionjs";
import "../../../scss/Home/ListCategories.scss";
import SpinLoad from "../../Spin/Spin";
import renderHtml from "react-render-html";
export default function ListCategories() {
	const dispatch = useDispatch();
	const actionResult = async () => {
		await dispatch(typeWorkData({ status: 1 }));
	};
	const typework = useSelector((state) => state.typeWorks.typeWork.data);
	const loading = useSelector((state) => state.typeWorks.loading);

	useEffect(() => {
		actionResult();
	}, []);
	return (
		<div className="categori">
			<div className="container">
				<div className="heading">
					<div className="heading__title">
						<h3>Chọn việc theo nghành</h3>
					</div>
					<div className="heading__hr"></div>
				</div>
				<div className="row">
					{loading ? (
						<SpinLoad />
					) : (
						GetCategoryHome(typework).map((item, index) => (
							<div className="col-lg-3 col-md-4 col-sm-12 " key={index}>
								<Link to="" className="categori__link">
									<div className="categori__box">
										<div className="categori__title">{item.name}</div>
										<div className="categori__icon">{item.icon ? renderHtml(item.icon) : ""}</div>
										<div className="categori__total">{item.length} công việc</div>
									</div>
								</Link>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
