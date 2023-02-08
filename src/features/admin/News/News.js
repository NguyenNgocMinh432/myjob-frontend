import React, { useEffect, useState } from 'react'
import { Button, Pagination, Popconfirm, Image, Spin, Table } from 'antd'
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { removenew, newData, updatenew } from '../Slice/newSlice';
export default function New() {
    const columns = [
        {
            title: 'tên tin tức',
            dataIndex: 'name',
        },
        {
            title: 'ảnh',
            dataIndex: 'avatar',
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            dataIndex: 'action'
        }
    ];

    const match = useRouteMatch();
    const news = useSelector(state => state.news.new.data);
    const loading = useSelector(state => state.news.loading)
    const dispatch = useDispatch();
    const [state, setState] = useState({ page: localStorage.getItem("pageNew") || 1 })
    const { page } = state
    const actionResult = async (page) => { await dispatch(newData(page)) }
    useEffect(() => {
        localStorage.setItem("pageNew", page);
        actionResult({ page: page });
    }, [page])
    const history = useHistory();
    const handleStatus = (e, id) => {
        if (e === 1) {
            dispatch(updatenew({ status: 0, id: id }))
        } else {
            dispatch(updatenew({ status: 1, id: id }))
        }
        setTimeout(() => {
            actionResult({ page: page });
        }, 500);
    }
    const onChangePage = page => {
        setState({
            page: page,
            pageCurent: page,
        });
    };
    const hangdleEdit = (id) => {
        history.replace(`${match.url}/editNew/${id}`)
    }
    const hangdleDelete = (e) => {
        dispatch(removenew(e));
        setTimeout(() => {
            actionResult({ page: page });
        }, 500);
    }
    return (
        <div id="admin">
            <div className="heading">
                <div className="heading__title">
                    <h3>Tin tức</h3>
                </div>
                <div className="heading__hr"></div>
            </div>
            <div className="content">
                <div className="add">
                    <Link to={`${match.url}/addNew`}><Button variant="outlined" color="secondary"><i className="fas fa-plus"></i>&nbsp;&nbsp; Thêm mới</Button></Link>
                </div>
                {loading ? <div className="spin"><Spin className="mt-5" /></div> :
                    <div>
                        <Table columns={columns} pagination={false} dataSource={news.rows.map((ok, index) => (
                            {
                                key: index + 1,
                                name: ok.name,
                                avatar: <Image src={ok.avatar} width="200px" />,
                                status: <div className="action">{ok.status === 1 ? <Link onClick={() => { handleStatus(ok.status, ok.id) }}><i className="far fa-thumbs-up "></i></Link> : <Link onClick={() => handleStatus(ok.status, ok.id)}><i className="far fa-thumbs-down "></i></Link>}</div>,
                                action:
                                    <div className="action">
                                        <Popconfirm title="Bạn có muốn sửa？" onConfirm={() => { hangdleEdit(ok.id) }} icon={<QuestionCircleOutlined style={{ color: 'green' }} />}>
                                            <Link ><i className="far fa-edit mr-4"></i></Link>
                                        </Popconfirm>
                                        <Popconfirm title="Bạn có muốn xoá？" onConfirm={() => { hangdleDelete(ok.id) }} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                                            <Link ><i className="far fa-trash-alt" ></i></Link>
                                        </Popconfirm>
                                    </div>
                            }))} />
                        <Pagination defaultCurrent={page} onChange={onChangePage} total={news.count} />
                    </div>
                }
            </div>
        </div>
    )
}
