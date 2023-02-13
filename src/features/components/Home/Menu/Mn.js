import { Avatar, Dropdown, Menu } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import checkLoginApi from "../../../../api/checkLogin";
import { checkBar, funLine, lineSlide, openMenu } from "../../../container/Functionjs";
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
	useEffect(() => {
		checkLoginApi.checkLogin().then((ok) => {
			setUser(ok.data.user);
		});
		let idClass = pathname.slice(1);
		let ListMenu = nav_el.current.querySelectorAll(".item");
		nav_el.current.querySelector(".item.active")?.classList?.remove("active");
		for (let i = 0; i < ListMenu.length; i++) {
			if (ListMenu[i].id == idClass) {
				ListMenu[i].classList.add("active");
			}
		}
	}, []);

	useEffect(()=> {
		window.addEventListener("scroll", function() {
			let getMenu = document.querySelector(".menu");
			getMenu.classList.toggle("sticky", window.scrollY > 0);
		})
		// return () => {
		// 	window.removeEventListener("scroll");
		// }
	})
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
		setUser("");
	};
	const logOut = (
		<Menu.Item key="3">
			<Link to="/" onClick={onLogOut}>
				Đăng xuất
			</Link>
		</Menu.Item>
	);
	const imgDefault =
		"https://1.bp.blogspot.com/-m3UYn4_PEms/Xnch6mOTHJI/AAAAAAAAZkE/GuepXW9p7MA6l81zSCnmNaFFhfQASQhowCLcBGAsYHQ/s1600/Cach-Lam-Avatar-Dang-Hot%2B%25281%2529.jpg";
	const ss = (
		<Menu>
			<Menu.Item key="0">
				<Link to="/login">Đăng nhập</Link>
			</Menu.Item>
			{user ? (user.type === "company" ? inforCompany : inforUser) : ""}
			{user ? logOut : ""}
		</Menu>
	);
	return (
		<div className={props.class}>
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
				<nav ref={nav_el} class="w-45 menu__right--pc">
					<div className="item active" id="">
						<Link to="/">Trang chủ</Link>
					</div>
					<div className="item" id="candidates">
						<Link to="/candidates">Ứng viên</Link>
					</div>
					<div className="item" id="jobs">
						<Link to="/jobs">Việc làm</Link>
					</div>
					<div className="item" id="companys">
						<Link to="/companys">Nhà tuyển dụng</Link>
					</div>
					{user && user.role === "user" && (
						<div className="item">
							<Link to="/createCv">Tạo cv</Link>
						</div>
					)}
					<div className="line_slide" ref={line_el}></div>
					{user ? (
						user.role === "admin" || user.role === "grant" ? (
							<div className="item">
								<Link to="/admin">admin</Link>
							</div>
						) : (
							""
						)
					) : (
						""
					)}
					<Dropdown overlay={ss} trigger={["click"]}>
						<span className="nav-link">
							<Avatar size="small" src={user ? user.avatar : imgDefault} />
						</span>
					</Dropdown>
				</nav>
			</div>
		</div>
	);
}
