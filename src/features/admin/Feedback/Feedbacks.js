import React, { useEffect, useState } from "react";
import { Divider, List, Typography } from 'antd';
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
                            // data.map((item,index) => {
                                 (
                                    // <div key={index}>
                                    //     {item.content}
                                    // </div>
                                    <List
                                        size="small"
                                        bordered
                                        dataSource={data}
                                        renderItem={(data) => <List.Item>{data.content}</List.Item>}
                                    />
                                )
                            // })
                        )
                    }
                </div>
			</div>
		</div>
	);
};

export default Feedbacks;
