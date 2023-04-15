import React, { useEffect, useState } from "react";
import feedBackApi from "../../../api/feedbacks";

const Feedbacks = () => {
    const [data, setData] = useState();
    useEffect(async() => {
        const dataFeed = await feedBackApi.getFeedback();
        setData(dataFeed);
    }, [])
	return (
		<div>
			<div className="heading">
				<div className="heading__title">
					<h3>Phản hồi</h3>
				</div>
				<div className="heading__hr"></div>
                <div>
                    {
                        data && data.length > 0 && (
                            data.map((item,index) => {
                                return (
                                    <div key={index}>
                                        {item.content}
                                    </div>
                                )
                            })
                        )
                    }
                </div>
			</div>
		</div>
	);
};

export default Feedbacks;
