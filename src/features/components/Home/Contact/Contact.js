import React, { useState } from "react";
import "../../../scss/Home/Contact.scss";
import feedBackApi from "../../../../api/feedbacks";
export default function Contact() {
	const [valueFeedback, setValueFeedback] = useState();

	const user = JSON.parse(localStorage.getItem('user'));

	const handleSendFeedback = async () => {
		const responseFeedback = await feedBackApi.create(
			{
				user_id: user && user.id,
				content: valueFeedback
			}
		)

		if (responseFeedback && responseFeedback.code === 1) {
			alert('Gửi góp ý thành công !! Xin cảm ơn bạn')
		}
	}
	return (
		<div className="contact">
			<div className="container">
				<div className="contact__title">
					<h3>Liên hệ phản ánh</h3>
				</div>
				<div className="contact__detail">
					<p>Liên lạc với chúng tôi nếu bạn gặp vấn đề gì đó.</p>
				</div>
				<div className="contact__gmail">
					<textarea
						name=""
						id=""
						cols="30"
						rows="4"
						value={valueFeedback}
						onChange={(e) => setValueFeedback(e.target.value)}
						placeholder="Nội dung ..."
					></textarea>
					<button onClick={handleSendFeedback}>Phản hồi</button>
				</div>
			</div>
		</div>
	);
}
