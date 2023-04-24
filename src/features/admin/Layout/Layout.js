import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import "../../scss/Admin/Nav.scss";
import CheckCompany from "../CheckCompany/CheckCompany";
import AddContact from "../Contact/AddContact";
import Contact from "../Contact/Contact";
import AddFormCv from "../FormCV/AddFormCV";
import FormCv from "../FormCV/FormCV";
import Jobs from "../Jobs/Jobs";
import AddNew from "../News/AddNew";
import News from "../News/News";
import Revenue from "../Revenue/Revenue";
import AddSocialNetwork from "../SocialNetwork/addSocialNetwork";
import SocialNetwork from "../SocialNetwork/SocialNetwork";
import AddTag from "../Tag/AddTag";
import Tag from "../Tag/Tag";
import AddTypeWork from "../TypeWork/AddTypeWork";
import TypeWork from "../TypeWork/TypeWork";
import User from "../User/User";
import Feedbacks from "../Feedback/Feedbacks";
import CheckCompanyPost from "../CheckCompanyPost/CheckCompanyPost";
export default function Nav() {
	const match = useRouteMatch();
	// console.log(match);
	const { Header, Sider, Content } = Layout;
	const [state, setState] = useState({
		collapsed: true,
		visible: true,
	});
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const toggle = () => {
		setState({
			collapsed: !state.collapsed,
		});
	};

	return (
		<div id="nav">
			<Layout>
				<Sider trigger={null} collapsible collapsed={state.collapsed}>
					<div className="logo">
						<Link to="/">
							<p className="text-center w-100">
								{state.collapsed === true ? (
									<i className="fas fa-user-shield"></i>
								) : (
									<strong>Administration</strong>
								)}
							</p>
						</Link>
					</div>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
						{/* <Menu.Item
							key="1"
							icon={
								state.collapsed === true ? (
									<span className="far fa-newspaper"></span>
								) : (
									<span className="far fa-newspaper mr-2"></span>
								)
							}
						>
							<Link to="/admin">Doanh thu</Link>
						</Menu.Item> */}
						<Menu.Item
							key="4"
							icon={
								state.collapsed === true ? (
									<span className="fas fa-check"></span>
								) : (
									<span className="fas fa-check mr-2"></span>
								)
							}
						>
							<Link to={`${match.url}/checkCompany`}>Kiểm tra tài khoản</Link>
						</Menu.Item>

						<Menu.Item
							key="1"
							icon={
								state.collapsed === true ? (
									<span className="fas fa-check"></span>
								) : (
									<span className="fas fa-check mr-2"></span>
								)
							}
						>
							<Link to={`${match.url}/checkCompanyPost`}>Kiểm duyệt bài đăng tuyển dụng</Link>
						</Menu.Item>

						<Menu.Item
							key="3"
							icon={
								state.collapsed === true ? (
									<span className="far fa-newspaper"></span>
								) : (
									<span className="far fa-newspaper mr-2"></span>
								)
							}
						>
							<Link to={`${match.url}/new`}>Tin tức</Link>
						</Menu.Item>
						<Menu.Item
							key="2"
							icon={
								state.collapsed === true ? (
									<span className="fas fa-tags"></span>
								) : (
									<span className="fas fa-tags mr-2"></span>
								)
							}
						>
							<Link to={`${match.url}/tag`}>Tag</Link>
						</Menu.Item>
						<Menu.Item
							key="5"
							icon={
								state.collapsed === true ? (
									<span className="fas fa-code-branch"></span>
								) : (
									<span className="fas fa-code-branch mr-2"></span>
								)
							}
						>
							<Link to={`${match.url}/typeWork`}>Loại công việc</Link>
						</Menu.Item>
						<Menu.Item
							key="6"
							icon={
								state.collapsed === true ? (
									<span className="fas fa-briefcase"></span>
								) : (
									<span className="fas fa-briefcase mr-2"></span>
								)
							}
						>
							<Link to={`${match.url}/work`}>Công việc</Link>
						</Menu.Item>
						<Menu.Item
							key="7"
							icon={
								state.collapsed === true ? (
									<span className="fas fa-layer-group"></span>
								) : (
									<span className="fas fa-layer-group mr-2"></span>
								)
							}
						>
							<Link to={`${match.url}/formCV`}>Form CV</Link>
						</Menu.Item>
						<Menu.Item
							key="8"
							icon={
								state.collapsed === true ? (
									<span className="fas fa-address-book"></span>
								) : (
									<span className="fas fa-address-book mr-2"></span>
								)
							}
						>
							<Link to={`${match.url}/contact`}>Liên hệ</Link>
						</Menu.Item>
						<Menu.Item
							key="10"
							icon={
								state.collapsed === true ? (
									<span className="fab fa-twitter"></span>
								) : (
									<span className="fab fa-twitter mr-2"></span>
								)
							}
						>
							<Link to={`${match.url}/socialNetwork`}>Mạng xã hội</Link>
						</Menu.Item>
						<Menu.Item
							key="11"
							icon={
								state.collapsed === true ? (
									<span className="fas fa-user-injured"></span>
								) : (
									<span className="fas fa-user-injured mr-2"></span>
								)
							}
						>
							<Link to={`${match.url}/users`}>Cấp quyền</Link>
						</Menu.Item>
						{/* Góp ý */}
						<Menu.Item
							key="12"
							icon={
								state.collapsed === true ? (
									<i className="fas fa-user-injured"></i>
								) : (
									<span className="fas fa-user-injured mr-2"></span>
								)
							}
						>
							<Link to={`${match.url}/feedbacks`}>Góp ý từ user</Link>
						</Menu.Item>
					</Menu>
				</Sider>

				<Layout className="site-layout">
					<Header className="site-layout-background" style={{ padding: 0 }}>
						{/* <Headers /> */}
						{React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
							className: "trigger",
							onClick: toggle,
						})}
					</Header>
					<Content
						className="site-layout-background h-100vh"
						style={{
							margin: "24px 16px",
							padding: 24,
							minHeight: 280,
						}}
					>
						<Switch>
							<Route exact path={match.path}>
								<Revenue />
							</Route>
							<Route exact path={`${match.path}/new`}>
								<News url={match.url} />
							</Route>
							<Route exact path={`${match.path}/tag`}>
								<Tag url={match.url} />
							</Route>
							<Route exact path={`${match.path}/socialNetwork`}>
								<SocialNetwork url={match.url} />
							</Route>
							<Route exact path={`${match.path}/contact`}>
								<Contact url={match.url} />
							</Route>
							<Route exact path={`${match.path}/formCV`}>
								<FormCv url={match.url} />
							</Route>
							<Route exact path={`${match.path}/work`}>
								<Jobs url={match.url} />
							</Route>
							<Route exact path={`${match.path}/users`}>
								<User url={match.url} />
							</Route>

							<Route exact path={`${match.path}/feedbacks`}>
								<Feedbacks url={match.url} />
							</Route>

							<Route exact path={`${match.path}/typeWork`}>
								<TypeWork url={match.url} />
							</Route>
							<Route exact path={`${match.path}/checkCompany`}>
								<CheckCompany url={match.url} />
							</Route>
							{/* Kiểm duyệt bài đăng */}
							<Route exact path={`${match.path}/checkCompanyPost`}>
								<CheckCompanyPost url={match.url} />
							</Route>
							<Route path={`${match.path}/formCV/addFormCV`}>
								<AddFormCv url={match.url} />
							</Route>
							<Route path={`${match.path}/formCV/editFormCV/:id`}>
								<AddFormCv url={match.url} />
							</Route>
							<Route path={`${match.path}/socialNetwork/addSocialNetwork`}>
								<AddSocialNetwork url={match.url} />
							</Route>
							<Route path={`${match.path}/socialNetwork/editSocialNetwork/:id`}>
								<AddSocialNetwork url={match.url} />
							</Route>
							<Route path={`${match.path}/contact/addContact`}>
								<AddContact url={match.url} />
							</Route>
							<Route path={`${match.path}/contact/editContact/:id`}>
								<AddContact url={match.url} />
							</Route>
							<Route path={`${match.path}/tag/addTag`}>
								<AddTag url={match.url} />
							</Route>
							<Route path={`${match.path}/tag/editTag/:id`}>
								<AddTag url={match.url} />
							</Route>
							<Route path={`${match.path}/typeWork/addTypeWork`}>
								<AddTypeWork url={match.url} />
							</Route>
							<Route path={`${match.path}/typeWork/editTypeWork/:id`}>
								<AddTypeWork url={match.url} />
							</Route>
							<Route path={`${match.path}/new/editNew/:id`}>
								<AddNew url={match.url} />
							</Route>
							<Route path={`${match.path}/new/addNew`}>
								<AddNew url={match.url} />
							</Route>
						</Switch>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
}
