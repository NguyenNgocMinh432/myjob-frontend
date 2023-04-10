import React from "react";
import "../../../scss/Home/Suggests.scss";
import { useHistory } from "react-router-dom";
const Suggests = ({work}) => {
    console.log("work", work);
    const history = useHistory();
    const handleClickItemSuggest = (id) => {
        history.push(`/jobs/work/${id}`);
    }
	return <div className="suggest__search">
        <div>
            <p className="fw-bold">Gợi ý</p>
        </div>
        <div>
            {
                work?.rows?.map((item,index) => {
                    return <p key={index} onClick={() =>handleClickItemSuggest(item?.id)} className="suggest__search--item">
                        {item?.name}
                    </p>
                })
            }
        </div>
    </div>;
};

export default Suggests;
