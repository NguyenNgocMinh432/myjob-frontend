import React from "react";
import { Link , useHistory} from "react-router-dom";
import "../../../scss/Home/CvHome.scss";
import { message } from "antd";
export default function CvHome() {
	const history = useHistory();
	const user = JSON.parse(localStorage.getItem("user"));
	const handleClickCreateCV = () => {
		console.log('cv')
		if (user) {
			history.push("/createCv")
		} else {
			message.error("Bạn chưa đăng nhập không thể tạo CV !!!!")
		}
	}
	return (
		<div className="CvHome">
			<div className="container">
				<div className="CvHome__title">
					<h3>Tạo CV để bắt đầu ứng tuyển</h3>
				</div>
				<div className="CvHome__detail">
					<p>Có rất nhiều cơ hội làm việc cho bạn, hãy bắt đầu bằng việc tạo một cv thật đẹp.</p>
				</div>
				<div className="CvHome__button">
					<Link to="" className="btnCV createCv" onClick={handleClickCreateCV}>Tạo CV</Link>
					<Link to="/jobs" className="btnCV searchCv">
						Tìm việc ngay
					</Link>
				</div>
			</div>
		</div>
	);
}
