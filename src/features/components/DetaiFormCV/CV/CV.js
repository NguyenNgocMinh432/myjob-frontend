import React, { useEffect } from "react";
import renderHtml from "react-render-html";
import userApi from "../../../../api/userApi";
export default function CV({ data }) {
	const user = JSON.parse(localStorage.getItem('user'));
	const cvId = localStorage.getItem('CVSelector');
	useEffect(async() => {

		const responseGetInfoCv = await userApi.getUserCV({
			userId: user.id,
			cvId
		})
		const resultGetInfoCv = responseGetInfoCv.data
		if (data && document.querySelector("#avatar__cv")) {
			const getElementAvatar = document.querySelector("#avatar__cv");
			getElementAvatar.setAttribute(
				"src",
				resultGetInfoCv?.avatar
			);
		}

		if (data && document.querySelector("#experience__cv")) {
			const getElementAvatar = document.querySelector("#experience__cv");
			getElementAvatar.innerHTML = resultGetInfoCv?.experience
		}

		if (data && document.querySelector("#education__cv")) {
			const getElementAvatar = document.querySelector("#education__cv");
			getElementAvatar.innerHTML = resultGetInfoCv?.education
		}

		if (data && document.querySelector("#target__cv")) {
			const getElementAvatar = document.querySelector("#target__cv");
			getElementAvatar.innerHTML = resultGetInfoCv?.target
		}

		if (data && document.querySelector("#project__cv")) {
			const getElementAvatar = document.querySelector("#project__cv");
			getElementAvatar.innerHTML = resultGetInfoCv?.project
		}

		if (data && document.querySelector("#more__info__cv")) {
			const getElementAvatar = document.querySelector("#more__info__cv");
			getElementAvatar.innerHTML = resultGetInfoCv?.more
		}
	}, [data]);
	return (
		<div
			className="container"
			style={{ marginTop: "1rem", marginBottom: "2rem" }}
		>
			{data ? renderHtml(data.content) : ""}
		</div>
	);
}
