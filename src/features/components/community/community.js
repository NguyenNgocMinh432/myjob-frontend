import React from "react";
import Footer from "../Home/Footer/Footer";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Communitys from "./communitys/communitys";

export default function Community() {
	return (
		<div>
			<Breadcrumb />
				<Communitys />
			<Footer />
		</div>
	);
}
