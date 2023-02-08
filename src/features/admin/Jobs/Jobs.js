import { Pagination, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { removework, updatework, workData } from "../Slice/workSlice";
export default function Work() {
  const columns = [
    {
      title: "tên work",
      dataIndex: "name",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
    },
  ];

  const match = useRouteMatch();
  const work = useSelector((state) => state.works.work.data);
  const loading = useSelector((state) => state.works.loading);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    page: localStorage.getItem("pagework") || 1,
  });
  const { page } = state;
  const actionResult = async (page) => {
    await dispatch(workData(page));
  };
  useEffect(() => {
    localStorage.setItem("pagework", page);
    actionResult({ page: page });
  }, [page]);
  const history = useHistory();
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updatework({ status: 0, id: id }));
    } else {
      dispatch(updatework({ status: 1, id: id }));
    }
    setTimeout(() => {
      actionResult({ page: page });
    }, 500);
  };
  const onChangePage = (page) => {
    setState({
      page: page,
      pageCurent: page,
    });
  };
  const hangdleEdit = (id) => {
    history.replace(`${match.url}/editwork/${id}`);
  };
  const hangdleDelete = (e) => {
    dispatch(removework(e));
    setTimeout(() => {
      actionResult({ page: page });
    }, 500);
  };
  return (
    <div id="admin">
      <div className="heading">
        <div className="heading__title">
          <h3>Công việc</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="content">
        {loading ? (
          <div className="spin">
            <Spin className="mt-5" />
          </div>
        ) : (
          <div>
            <Table
              columns={columns}
              pagination={false}
              dataSource={work.rows.map((ok, index) => ({
                key: index + 1,
                name: <Link to={`/jobs/work/${ok.id}`}>{ok.name}</Link>,
                status: (
                  <div className="action">
                    {ok.status === 1 ? (
                      <Link
                        onClick={() => {
                          handleStatus(ok.status, ok.id);
                        }}
                      >
                        <i className="far fa-thumbs-up "></i>
                      </Link>
                    ) : (
                      <Link onClick={() => handleStatus(ok.status, ok.id)}>
                        <i className="far fa-thumbs-down "></i>
                      </Link>
                    )}
                  </div>
                ),
              }))}
            />
            <Pagination
              defaultCurrent={page}
              onChange={onChangePage}
              total={work.count}
            />
          </div>
        )}
      </div>
    </div>
  );
}
