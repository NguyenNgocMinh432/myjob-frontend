import React from "react";
import { useRouteMatch } from "react-router-dom";
import Menu from "../Home/Menu/Menu";
export default function CheckMenu({count, dataNotifications}) {
	const { path } = useRouteMatch();
	const HidenMenu = () => {
		return <div></div>;
	};
	return <div>{path === "/" ? <Menu count={count} dataNotifications={dataNotifications} /> : <HidenMenu />}</div>;
}
