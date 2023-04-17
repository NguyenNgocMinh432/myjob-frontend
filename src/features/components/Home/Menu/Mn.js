import { Avatar, Dropdown, Menu, Badge, Space } from "antd";
import Icon, { BellOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import checkLoginApi from "../../../../api/checkLogin";
import {
	checkBar,
	funLine,
	lineSlide,
	openMenu,
} from "../../../container/Functionjs";
import logo from "../../../images/logossss.png";
import "../../../scss/Home/Menu.scss";
export default function Mn(props) {
	const okok = (bar_ref, nav_ref, line_ref) => {
		setTimeout(() => {
			lineSlide();
			openMenu(bar_ref.current);
			funLine();
			checkBar(bar_ref.current, nav_ref.current, line_ref.current);
			window.addEventListener("resize", (e) => {
				funLine();
				checkBar(bar_ref.current, nav_ref.current, line_ref.current);
			});
		}, 500);
	};
	let { pathname } = useLocation();
	const bar_el = useRef(null);
	const nav_el = useRef(null);
	const line_el = useRef(null);
	const [user, setUser] = useState();
	okok(bar_el, nav_el, line_el);

	// Hàm xử lý phần upgrade dữ liệu
	const onClickUpgrade = () => {
		alert('Upgrade');
	}

	useEffect(() => {
		checkLoginApi
			.checkLogin()
			.then((ok) => {
				setUser(ok.data.user);
				// Lưu user lấy được vào localStorage
				localStorage.setItem("user", JSON.stringify(ok.data.user));
			})
			.catch((err) => {
				const checkUserFromLocal = JSON.parse(
					localStorage.getItem("user")
				);
				if (checkUserFromLocal) {
					setUser(checkUserFromLocal);
				} else {
				}
			});
		let idClass = pathname.slice(1);
		let ListMenu = nav_el.current.querySelectorAll(".item");
		nav_el.current
			.querySelector(".item.active")
			?.classList?.remove("active");
		for (let i = 0; i < ListMenu.length; i++) {
			if (ListMenu[i].id === idClass) {
				ListMenu[i].classList.add("active");
			}
		}
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", function () {
			let getMenu = document.querySelector(".menu");
			getMenu?.classList.toggle("sticky", window.scrollY > 0);
		});
		// return () => {
		// 	window.removeEventListener("scroll");
		// }
	});
	const inforCompany = (
		<Menu.Item key="1">
			<Link to="/inforCompany">Thông tin cá nhân</Link>
		</Menu.Item>
	);
	const inforUser = (
		<Menu.Item key="2">
			<Link to="/inforUser">Thông tin cá nhân</Link>
		</Menu.Item>
	);
	const onLogOut = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser("");
	};
	const logOut = (
		<Menu.Item key="3">
			<Link to="/login" onClick={onLogOut}>
				Đăng xuất
			</Link>
		</Menu.Item>
	);
	const imgDefault =
		"https://1.bp.blogspot.com/-m3UYn4_PEms/Xnch6mOTHJI/AAAAAAAAZkE/GuepXW9p7MA6l81zSCnmNaFFhfQASQhowCLcBGAsYHQ/s1600/Cach-Lam-Avatar-Dang-Hot%2B%25281%2529.jpg";
	
	// item nâng cấp tài khoản
	const upgrade = (
		<Menu.Item key="4">
			<Link to="" onClick={onClickUpgrade}>
				Nâng cấp tài khoản
			</Link>
		</Menu.Item>

	)
	const ss = (
		<Menu>
			{!user ? (
				<Menu.Item key="0">
					<Link to="/login">Đăng nhập</Link>
				</Menu.Item>
			) : (
				""
			)}
			{user ? (user.type === "company" ? inforCompany : inforUser) : ""}
			{user? upgrade: "" }
			{user ? logOut : ""}
			
		</Menu>
	);

	// Thông báo
	const notification = (
		<Menu>
			{
				props.count === 0 ? <div>Chưa có thông báo nào</div> : (
					props.dataNotifications.map((item,index) => {
						return <div key={index}>{item.title}</div>
					})
				)
			}
		</Menu>
	)
	return (
		<div className={`${props.class_menu}`}>
			<div className="container header__menu">
				<div className="menu__brand">
					<Link to="/">
						<img src={logo} height={40} alt="" />
					</Link>
				</div>
				<div className="menu--right">
					<div className="bar menu__bar" ref={bar_el}>
						<div className="line--top"></div>
						<div className="line--mid"></div>
						<div className="line--bot"></div>
					</div>
					<nav ref={nav_el} className="w-50 menu__right--pc">
						<div className="item active" id="">
							<Link to="/">Trang chủ</Link>
						</div>
						{/* Là tài khoản user sẽ xem được cộng đồng người dùng web */}
						{user?.role !== "grant" && (
							<div className="item" id="community">
								<Link to="/community">Cộng đồng</Link>
							</div>
						)}
						{/* Là tài khoản công ty hoặc admin mới xem được CV */}
						{user ? (
							user.role === "admin" || user.role === "grant" ? (
								<div className="item" id="candidates">
									<Link to="/candidates">Ứng viên</Link>
								</div>
							) : (
								""
							)
						) : (
							""
						)}

						<div className="item" id="jobs">
							<Link to="/jobs">Việc làm</Link>
						</div>
						<div className="item" id="companys">
							<Link to="/companys">Nhà tuyển dụng</Link>
						</div>
						{/* Check điều kiện là use thường mơi cho phép tạo cv */}
						{user && user.role === "user" && (
							<div className="item">
								<Link to="/createCv">Tạo CV</Link>
							</div>
						)}
						<div className="line_slide" ref={line_el}></div>
						{user ? (
							user.role === "admin" || user.role === "grant" ? (
								<div className="item">
									<Link to="/admin">Admin</Link>
								</div>
							) : (
								""
							)
						) : (
							""
						)}
						<Dropdown overlay={ss} trigger={["click"]}>
							<span className="nav-link">
								<Avatar
									size="small"
									src={user ? user.avatar : imgDefault}
								/>
							</span>
						</Dropdown>
						<Dropdown overlay={notification} trigger={["click"]}>
							<Space size="large">
								<Badge count={props.count}>
									{/* <Avatar src="https://img.lovepik.com/original_origin_pic/18/03/16/e5e34a246a53695e4a0bc3a147b680df.png_wh860.png" shape="circle" size="small" /> */}
									<BellOutlined
										style={{
											fontSize: "23px",
											color:"white",
										}}
									/>
								</Badge>
							</Space>
						</Dropdown>
					</nav>
				</div>
			</div>
		</div>
	);
}
