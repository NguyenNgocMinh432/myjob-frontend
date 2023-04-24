import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { workData } from "../../../admin/Slice/workSlice";
import { Radio } from "antd";
import { formatDateWork } from "../../../container/Functionjs";
import "../../../scss/SearchJobs/ListJob.scss";
import SpinLoad from "../../Spin/Spin";
import KeyTag from "./KeyTag";
import typeWorkApi from "../../../../api/typeWorkApi";
export default function Job({ searchData, onTime, onAmout, amount, time, id }) {

	const [workType, setWorkType] = useState();
	const [check, setCheck] = useState(false);
	let work = useSelector((state) => state.works.work.data);
	const loading = useSelector((state) => state.works.loading);
	const dispatch = useDispatch();
	const [state, setState] = useState({ page: localStorage.getItem("pageWorkHome") || 1 });
	const { page } = state;
	const onChangePage = (page) => {
		setState({
			page: page,
		});
	};

	const actionResult = async (page) => {
		await dispatch(workData(page));
	};
	// Lấy type của works
	let render = false;
	useEffect(async() => {
		let data = await typeWorkApi.getWorks(id);
		console.log('data works lấy về', data);
		setWorkType({rows: data});
		setCheck(true);
		// const dataFilter = data && data.data.rows;
		// const dataCheck = dataFilter.filter((item,index) => {
		// 	return item.id === Number(id);
		// })
		// const workCheck = dataCheck[0].works
		// console.log("workCheck", dataCheck)
		// const dataWorks = workCheck.filter((item,index) => {
		// 	return work && work.rows.filter((item2) => {
		// 		return item.id = item2.id
		// 	})
		// });
		// console.log("dataCheck", dataWorks)
		render= true;
	},[check, render])

	console.log("stateWork", workType);

	useEffect(() => {
		localStorage.setItem("pageWorkHome", page);
		actionResult({ page: page, status: 1 });
	}, [page]);
	const onChangeTime = (e) => {
		onTime(e.target.value);
	};
	const onChangeAmount = (e) => {
		onAmout(e.target.value);
	};
	
	return (
		<div className="ListJobSearch">
			<div className="container">
				<div className="row">
					<div className="col-md-8">
						{searchData === "" ? (
							loading ? (
								<SpinLoad />
							) : (
								work.rows.map((data, index) => (
									<div className="job__box" key={index}>
										<div className="job__tag">hot</div>
										<div className="job__logo">
											<img src={data?.company?.avatar} alt="" />
										</div>
										<div className="job__content">
											<div className="job__title">
												<Link to={`/jobs/work/${data.id}`}>
													<h4 className="jobTitle" title={data?.name}>
														{data?.name}
													</h4>
												</Link>
											</div>
											<div className="job__nameCompany">
												<Link to={`/jobs/work/${data.id}`}>
													{" "}
													<span>{data?.company.name}</span>
												</Link>
											</div>
											<div className="job__detail">
												<div className="job__detail--address">
													<div className="job__icon">
														<i className="fas fa-map-marker-alt"></i>
													</div>
													<span>{data?.address}</span>
												</div>
												<div className="job__detail--deadline outSize outSize">
													<div className="job__icon">
														<i className="far fa-clock"></i>
													</div>
													<span>{formatDateWork(data?.dealtime)}</span>
												</div>
												<div className="job__detail--salary">
													<div className="job__icon">
														<i className="fas fa-dollar-sign"></i>
													</div>
													<span>
														{data.price1} - {data.price2} Triệu VNĐ
													</span>
												</div>
											</div>
										</div>
									</div>
								))
							)
						) : (
							searchData.rows.map((data, index) => (
								<div className="job__box" key={index}>
									<div className="job__tag">hot</div>
									<div className="job__logo">
										<img src={data?.company.avatar} alt="" />
									</div>
									<div className="job__content">
										<div className="job__title">
											<Link to={`/jobs/work/${data.id}`}>
												<h4 className="jobTitle" title={data?.name}>
													{data?.name}
												</h4>
											</Link>
										</div>
										<div className="job__nameCompany">
											<Link to={`/jobs/work/${data.id}`}>
												{" "}
												<span>{data?.company.name}</span>
											</Link>
										</div>
										<div className="job__detail">
											<div className="job__detail--address">
												<div className="job__icon">
													<i className="fas fa-map-marker-alt"></i>
												</div>
												<span>{data?.address}</span>
											</div>
											<div className="job__detail--deadline outSize outSize">
												<div className="job__icon">
													<i className="far fa-clock"></i>
												</div>
												<span>{formatDateWork(data?.dealtime)}</span>
											</div>
											<div className="job__detail--salary">
												<div className="job__icon">
													<i className="fas fa-dollar-sign"></i>
												</div>
												<span>
													{data.price1} - {data.price2} Triệu VNĐ
												</span>
											</div>
										</div>
									</div>
								</div>
							))
						)}
						{searchData === "" ? (
							loading ? (
								<SpinLoad />
							) : (
								<div className="pagination">
									<Pagination defaultCurrent={page} onChange={onChangePage} total={work.count} />
								</div>
							)
						) : (
							""
						)}
					</div>
					<div className="col-md-4">
						{/* <div className="box__filter">
							<div className="filter--title">
								<p className="fw-bold">Số lượng tuyển</p>
							</div>
							<div className="filter__content">
								<Radio.Group onChange={onChangeAmount} value={amount}>
									<Radio className="mb-1" value="0">
										Tất cả
									</Radio>
									<br />
									<Radio className="mb-1" value="5">
										5 nhân viên
									</Radio>
									<br />
									<Radio className="mb-1" value="10">
										10 nhân viên
									</Radio>
									<br />
									<Radio value="15">15 nhân viên</Radio>
								</Radio.Group>
							</div>
						</div> */}
						<div className="box__filter">
							<div className="filter--title">
								<p className="fw-bold">Thời gian làm việc </p>
							</div>
							<div className="filter__content">
								<Radio.Group onChange={onChangeTime} value={time}>
									<Radio className="mb-1" value="0">
										Tất cả
									</Radio>
									<br />
									<Radio className="mb-1" value="Full Time">
										Full Time
									</Radio>
									<br />
									<Radio value="Part Time">Part Time</Radio>
								</Radio.Group>
							</div>
						</div>
						<KeyTag />
					</div>
				</div>
			</div>
		</div>
	);
}
