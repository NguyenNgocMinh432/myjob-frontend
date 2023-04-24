import { messaging } from "./firebase";
import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	useRouteMatch,
} from "react-router-dom";

import "./App.scss";
import Home from "./features/components/Home/Home";
import Jobs from "./features/components/Jobs/Jobs";
import { checkBar } from "./features/container/Functionjs";
import "antd/dist/antd.css";
import DetailJob from "./features/components/DetailJob/DetailJob";
import ListNews from "./features/components/ListNews/ListNews";
import DetailNew from "./features/components/DetailNew/DetailNew";
import Company from "./features/components/company/Company";
import DetailCompany from "./features/components/DetailCompany/DetailCompany";
import Candidates from "./features/components/Candidates/Candidates";
import DetailCandidate from "./features/components/DetailCandidate/DetailCandidate";
import Login from "./features/components/Login/Login";
import Admin from "./app/Admin";
import Register from "./features/components/Register/Register";
import InforCompany from "./features/components/inforCompany/InforCompany";
import InforUser from "./features/components/inforUser/InforUser";
import CreateCv from "./features/components/CreateCv/CreateCv";
import DetailFormCV from "./features/components/DetaiFormCV/DetaiFormCV";
import InforCV from "./features/components/CreateCv/InforCV/InforCV";
import checkLoginApi from "./api/checkLogin";
import Empty from "./features/components/Empty/Empty";
import Menu from "./features/components/Home/Menu/Menu";
import CheckMenu from "./features/components/CheckMenu/CheckMenu";
import Community from "./features/components/community/community";
import userApi from "./api/userApi";
import { connect, useDispatch } from "react-redux";
import { socket } from "./socket";
import { notification } from "antd";
import { workData } from "./features/admin/Slice/workSlice";
function App() {
	// config phần thông báo
	// const messaging = getMessaging();
	// Add the public key generated from the console here.
	// getToken(messaging, {vapidKey: "BDEyeuQ-nFWuFDTOvTQQC8PvWTgUvw3a7JnyaZIH6h8DDcfkaOCassGDcKA0gyuXrGQE_D8ZU6KMUqCrapOqO-U"}).then((curentToken) => {
	// 	if (curentToken) {
	// 		console.log(curentToken);
	// 	} else {
	// 		console.log("error không thể get token");
	// 	}
	// });

	// socket connect
	let dataNotifications = [];
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [fooEvents, setFooEvents] = useState([]);
	const [count, setCount] = useState(0);
	const [dataNotificationSend, setDataNotificationSend] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onFooEvent(value) {
			const dataNotification = JSON.parse(value);
			if (dataNotification) {
				setCount(prev => prev + 1);
				// setDataNotifications([...dataNotifications, dataNotification])
				dataNotifications.push(dataNotification);
				console.log(dataNotifications);
				notification.open({
					message: `${dataNotification?.name} đã chia sẻ 1 công việc với bạn`,
					description:
					  	`${dataNotification?.title} địa chỉ ${dataNotification?.address}`,
					onClick: () => {
						if (count > 0) {
							setCount(prev => prev - 1);
						}
					  	window.location.href = `${dataNotification?.url}`;
					},
				});
				
			}
			setFooEvents((previous) => [...previous, value]);
		}
		//Nếu có user thì mới connect để lấy thông báo
		if (user) {
			socket.on("connect", onConnect);
			socket.on("disconnect", onDisconnect);
			socket.on(`result ${user && user.id} `, onFooEvent);
		}

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("foo", onFooEvent);
		};
	}, []);

	const user = JSON.parse(localStorage.getItem("user"));
	//config phần thông báo
	useEffect(() => {
		if (Notification.permission === "granted") {
			// Hiển thị thông báo
			messaging
				.requestPermission()
				.then(() => {
					return messaging.getToken();
				})
				.then(async (data) => {
					console.log("data token thông báo", data);
					// Đăng ký dữ liệu lên db
					const dataSendb = {
						userId: user?.id,
						token: data,
					};
					// await userApi.postDevice(dataSendb);
				});
		} else if (Notification.permission === "denied") {
			// Hiển thị thông báo lỗi
			console.log(" chưa cho quyền thông báo rồi");
		} else {
			// Hiển thị thông báo yêu cầu quyền
		}
	}, []);

	useEffect(() => {
		checkBar();
	});

	const [checkAdmin, setCheckAdmin] = useState();
	useEffect(() => {
		/* Checking if the user is admin or not. */
		checkLoginApi.checkLogin().then((item, index) => {
			// setUser(item.data.user.role);
			let user = item.data.user.role;
			if (user === "admin" || user === "grant") {
				setCheckAdmin(
					<Route path="/admin">
						<Ladmin />
					</Route>
				);
			} else {
				setCheckAdmin(
					<Route path="/admin">
						<Empty />
					</Route>
				);
			}
		})
		.catch(function (err) {
			const getUsers = JSON.parse(localStorage.getItem('user'));
			if (getUsers) {
				let user = getUsers?.role;
				if (user === "admin" || user === "grant") {
					setCheckAdmin(
						<Route path="/admin">
							<Ladmin />
						</Route>
					);
				} else {
					setCheckAdmin(
						<Route path="/admin">
							<Empty />
						</Route>
					);
				}
			}
		})
		;
	}, []);
	// Lấy thông tin của notificator user 
	useEffect(async() => {
		const dataNotification = await userApi.getNotification({
			user_id: user && user.id
		})
		if (dataNotification && dataNotification.code === 1) {
			setCount(Number(dataNotification.data.length))
		/* Iterating over the `data` array of `dataNotification` object and pushing each element into the
		`dataNotifications` array. */
			setDataNotificationSend(dataNotification.data);
		}
	}, [])

	useEffect(() => {
        const actionResult = async (page) => {
            await dispatch(workData(page));
        };
        actionResult();
    },[])
	return (
		<div>
			<Router>
				<Switch>
					<Route path={["/admin", "/register", "/Login", "/"]}>
						<CheckMenu count={count} dataNotifications={dataNotifications.length > 0 ? dataNotifications : dataNotificationSend }/>
					</Route>
				</Switch>

				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					{/* <Route path="/admin">
						<Ladmin />
					</Route> */}
					{checkAdmin}
					<Route exact path="/jobs">
						<Jobs />
					</Route>
					<Route exact path="/jobs/:id">
						<Jobs />
					</Route>
					<Route exact path="/news">
						<ListNews />
					</Route>
					<Route exact path="/news/detailNew/:id">
						<DetailNew />
					</Route>
					<Route exact path="/jobs/work/:id">
						<DetailJob />
					</Route>
					<Route exact path="/companys">
						<Company />
					</Route>
					<Route exact path="/companys/:id">
						<DetailCompany />
					</Route>
					<Route exact path="/candidates">
						<Candidates />
					</Route>
					<Route exact path="/candidates/:id">
						<DetailCandidate />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Route exact path="/inforCompany">
						<InforCompany />
					</Route>
					<Route exact path="/inforUser">
						<InforUser />
					</Route>
					<Route exact path="/createCv">
						<CreateCv />
					</Route>
					<Route exact path="/detaiFormCV/:id">
						<DetailFormCV />
					</Route>
					<Route exact path="/inforCV">
						<InforCV />
					</Route>
					<Route exact path="/community">
						<Community />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}
function Ladmin() {
	let { path, url } = useRouteMatch();

	return <Admin path={path} url={url} />;
}
export default App;
