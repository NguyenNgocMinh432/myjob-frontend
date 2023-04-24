import React, { useEffect, useState } from "react";
import { Button, Pagination, Popconfirm, Spin, Table } from "antd";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removecheckCompany, checkCompanyData, updatecheckCompany } from "../Slice/checkCompanySlice";
import { updatecompany } from "../Slice/companySlice";
import { removework, updatework, workDataCheck } from "../Slice/workSlice";
export default function CheckCompanyPost() {
	const columns = [
		{
			title: "Bài tuyển dụng",
			dataIndex: "name",
		},
		{
			title: "Công ty",
			dataIndex: "email",
		},
		{
			title: "Duyệt",
			dataIndex: "status",
		},
		{
			title: "Xoá",
			dataIndex: "action",
		},
	];
    useEffect(() => {
        const actionResult = async (page) => {
            await dispatch(workDataCheck(page));
        };
        actionResult();
    },[])
	const match = useRouteMatch();
	const checkCompanys = useSelector((state) => state.checkCompanys.checkCompany.data);
	let work = useSelector((state) => state.works.workCheck.data);
    console.log(work);
	const loading = useSelector((state) => state.checkCompanys.loading);
	const dispatch = useDispatch();
	const [state, setState] = useState({
		page: localStorage.getItem("pageCheckCompany") || 1,
	});
	const { page } = state;
	const actionResult = async (page) => {
		await dispatch(checkCompanyData(page));
	};
	useEffect(() => {
		localStorage.setItem("pagecheckCompany", page);
		actionResult({ page: page });
	}, [page]);
	const handleStatus = (e, id) => {
		if (e === 1) {
			dispatch(updatework({ status: 0, id: id }));
		} else {
			dispatch(updatework({ status: 1, id: id }));
		}
		setTimeout(() => {
			actionResult({ page: page });
		}, 500);
	};
	const onChangePage = (page) => {
		setState({
			page: page,
			pageCurent: page,
		});
	};
	const hangdleDelete = (e) => {
		dispatch(removework(e));
		setTimeout(() => {
			actionResult({ page: page });
		}, 500);
	};
	return (
		<div id="admin">
			<div className="heading">
				<div className="heading__title">
					<h3>Kiểm duyệt bài tuyển dụng của công ty</h3>
				</div>
				<div className="heading__hr"></div>
			</div>
			<div className="content">
				{loading ? (
					<div className="spin">
						<Spin className="mt-5" />
					</div>
				) : (
					<div>
						<Table
							columns={columns}
							pagination={false}
							dataSource={work && work.rows.map((ok, index) => ({
								key: index + 1,
								name: ok.name,
								email: ok.email,
								status: (
									<div className="action">
										{ok.status === 1 ? (
											<Link
												onClick={() => {
													handleStatus(ok.status, ok.id);
												}}
												to=""
											>
												<i className="far fa-thumbs-up "></i>
											</Link>
										) : (
											<Link to="" onClick={() => handleStatus(ok.status, ok.id)} to="" >
												<i className="fas fa-check"></i>
											</Link>
										)}
									</div>
								),
								action: (
									<div className="action">
										<Popconfirm
											title="Bạn có muốn xoá？"
											onConfirm={() => {
												hangdleDelete(ok.id);
											}}
											icon={<QuestionCircleOutlined style={{ color: "red" }} />}
										>
											<Link to="">
												<i className="far fa-trash-alt"></i>
											</Link>
										</Popconfirm>
									</div>
								),
							}))}
						/>
						<Pagination defaultCurrent={page} onChange={onChangePage} total={checkCompanys.count} />
					</div>
				)}
			</div>
		</div>
	);
}
