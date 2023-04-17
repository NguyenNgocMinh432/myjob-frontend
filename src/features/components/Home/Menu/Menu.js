import React from "react";
import { useRouteMatch } from "react-router-dom";
import Mn from "./Mn";
// import "./menujs"
export default function ListMenu({count, dataNotifications}) {
	const match = useRouteMatch();
	let checkMenu = match.isExact;
	return (
		<div>
			<Mn count={count} dataNotifications={dataNotifications} class_menu={`menu ${checkMenu ? "" : "notMenu"}`} />
		</div>
	);
}
