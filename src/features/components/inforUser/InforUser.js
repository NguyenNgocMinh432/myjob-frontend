import React, { useEffect, useState } from "react";
import checkLoginApi from "../../../api/checkLogin";
import MenuNotHome from "../MenuNotHome/MenuNotHome";
import SpinLoad from "../Spin/Spin";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Footer from "../Home/Footer/Footer";
import Tabs from "./Tabs/Tabs";
export default function InforUser() {
	const [user, setUser] = useState();
	useEffect(() => {
		const getUserFromLocal = JSON.parse(localStorage.getItem("user"));
		console.log(getUserFromLocal);
		setUser(getUserFromLocal);
		window.scrollTo(0, 0);
	}, []);
	return (
		<div>
			<div>
				{!user ? (
					<SpinLoad />
				) : (
					<div>
						{/* <MenuNotHome /> */}
						<Breadcrumb name={user.name} />
						<Tabs id={user.id} />
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
}
