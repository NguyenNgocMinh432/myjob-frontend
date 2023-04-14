import React, { useEffect, useState } from "react";
import feedBackApi from "../../../api/feedbacks";

const Feedbacks = () => {
    const [data, setData] = useState();
    useEffect(async() => {
        const dataFeed = await feedBackApi.getFeedback();
        setData(dataFeed);
    }, [])
    console.log("fff", data)
	return (
		<div>
			<div className="heading">
				<div className="heading__title">
					<h3>Phản hồi</h3>
				</div>
				<div className="heading__hr"></div>
                <div>
                    {

                    }
                </div>
			</div>
		</div>
	);
};

export default Feedbacks;
