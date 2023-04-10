import React from "react";
import "../../../scss/Home/Banner.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { removeVietnameseTones } from "../../../container/Functionjs";
import Suggests from "../Suggest/Suggests";
import { useSelector } from "react-redux";
export default function Banner() {
	const [state, setState] = useState({ name: "", address: "" });
	const [isSuggest, setSuggest] = useState(false);
	const [ check, setCheck] = useState('');
	const { name, address } = state;
	const work = useSelector((state) => state.works.work.data);
	const loading = useSelector((state) => state.works.loading);
	const onchange = (e) => {
		setCheck(e.target.value);
		if (e.target.value !== ""){
			setSuggest(true);
		} else if (e.target.value === ""){
			setSuggest(false);
		}
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<div className="banner">
			<div className="banner__search">
				<div className="banner__search--box">
					<div className="banner__search--box--title">
						<h4 className="text-center banner__text--search">
							Tìm kiếm công việc phù hợp với bản thân
						</h4>
					</div>
					<div className="banner__search--box--content">
						<input
							type="text"
							className="form-control"
							name="name"
							value={name}
							onChange={onchange}
							id=""
							aria-describedby="helpId"
							placeholder="Việc làm mong muốn ..."
						/>
						<input
							type="text"
							className="form-control"
							name="address"
							value={address}
							onChange={onchange}
							id=""
							aria-describedby="helpId"
							placeholder="Địa điểm"
						/>
						<Link
							to={`jobs?name=${removeVietnameseTones(
								name
							)}&address=${removeVietnameseTones(address)}`}
							className="btn btn-primary"
						>
							<button type="button">Search</button>
						</Link>
					</div>
					{/* Gợi ý công việc khi người dùng search */}
					{ isSuggest && <Suggests work={work}/> }
					<div className="banner__search--suggestions"></div>
				</div>
			</div>
		</div>
	);
}
