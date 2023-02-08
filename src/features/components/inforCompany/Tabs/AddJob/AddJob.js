import { DatePicker, Input, message, Select, Space } from "antd";
import { Option } from "antd/lib/mentions";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProvinces } from "sub-vn";
import { tagData } from "../../../../admin/Slice/tagSlice";
import { typeWorkData } from "../../../../admin/Slice/typeWorkSlice";
import { addwork } from "../../../../admin/Slice/workSlice";
import { FormatProvince } from "../../../../container/Functionjs";
import SpinLoad from "../../../Spin/Spin";
export default function AddJob({ id }) {
  // const { id } = useParams()
  const dispatch = useDispatch();
  const actionResultTag = async () => {
    await dispatch(tagData({ status: 1 }));
  };
  const actionResultTypeOfWork = async () => {
    await dispatch(typeWorkData({ status: 1 }));
  };
  const tags = useSelector((state) => state.tags.tag.data);
  const loadingTag = useSelector((state) => state.tags.loading);
  const typeWorks = useSelector((state) => state.typeWorks.typeWork.data);
  const loadingTypeWork = useSelector((state) => state.typeWorks.loading);
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [interest, setInterest] = useState();
  const [exprience, setExprience] = useState();
  const [form, setForm] = useState();
  const [description, setDescripton] = useState();
  const [state, setState] = useState({
    load: false,
    typeofworkId: 2,
    address: "Hà Nội",
    tagId: "",
    price1: "",
    nature: "Full Time",
    request: "Không yêu cầu",
    price2: "",
    date: "",
  });
  const {
    tagId,
    price1,
    price2,
    nature,
    request,
    date,
    load,
    typeofworkId,
    address,
  } = state;
  const onSubmit = (data) => {
    if (
      data.name === "" ||
      price1 === "" ||
      price2 === "" ||
      request === "" ||
      nature === "" ||
      tagId.length === 0 ||
      interest === "" ||
      description === "" ||
      exprience === "" ||
      form === "" ||
      data.address === "" ||
      data.phone === "" ||
      data.email === "" ||
      data.addressGoogle === "" ||
      date === ""
    ) {
      message.warning("Bạn chưa nhập đầy đủ thông tin!");
    } else {
      setState({
        ...state,
        load: true,
      });
      var TagWork = [];
      for (let i = 0; i < tagId.length; i++) {
        TagWork.push({ tagId: tagId[i] });
      }
      var workType = [];
      workType.push({ typeofworkId: typeofworkId });
      const action = addwork({
        workType: workType,
        companyId: id,
        name: data.name,
        status: 1,
        price1,
        price2,
        request,
        nature,
        TagWork,
        interest,
        description,
        exprience,
        form,
        address,
        phone: data.phone,
        email: data.email,
        addressGoogle: data.addressGoogle,
        dealtime: date,
      });
      dispatch(action);
      // console.log({ workType, companyId: id, name: data.name, status: 1, price1, price2, request, nature, TagWork, interest, description, exprience, form, address: data.address, phone: data.phone, email: data.email, addressGoogle: data.addressGoogle, dealtime: date });
      // setTimeout(() => {
      //     actionResult({ page: localStorage.getItem("pageTag") || 1 });
      // }, 700);
      history.push("/");
    }
  };
  const onChangePrice1 = (e) => {
    setState({
      ...state,
      price1: e.target.value,
    });
  };
  const onChangePrice2 = (e) => {
    setState({
      ...state,
      price2: e.target.value,
    });
  };
  const onChangeNature = (e) => {
    setState({
      ...state,
      nature: e,
    });
  };
  const onChangeTypeWork = (e) => {
    setState({
      ...state,
      typeofworkId: e,
    });
  };
  const onChangeRequest = (e) => {
    setState({
      ...state,
      request: e,
    });
  };
  const onChangeDate = (date, dateString) => {
    setState({
      ...state,
      date: dateString,
    });
  };
  useEffect(() => {
    actionResultTag();
    actionResultTypeOfWork();
  }, []);
  const data = [];
  if (tags) {
    tags.rows.map((e) => {
      data.push(<Option key={e.id}>{e.name}</Option>);
    });
  }
  const onChangeTag = (e) => {
    setState({
      ...state,
      tagId: e,
    });
  };
  const onchangeAddress = (e) => {
    setState({
      ...state,
      address: e,
    });
  };
  return (
    <div className="infor">
      <div className="heading">
        <div className="heading__title">
          <h3>Đăng tuyển việc làm</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="content pb-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex">
            <div className="form-group w-45">
              <label for="">Tên công việc</label>
              <input
                type="text"
                className="form-control"
                {...register("name")}
                id=""
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div className="form-group w-45">
              <label for="">Địa chỉ</label>
              {/* <input type="text" className="form-control" {...register("address")} id="" aria-describedby="helpId" placeholder="" />
                            <small>Tên đường và tên tỉnh</small> */}
              <Select
                value={address}
                onChange={onchangeAddress}
                className="form-control w-100"
              >
                {getProvinces().map((data) => (
                  <Option value={FormatProvince(data.name)}>{data.name}</Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-group w-45">
              <label for="">Email</label>
              <input
                type="text"
                className="form-control"
                {...register("email")}
                id=""
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div className="form-group w-45">
              <label for="">Link google map</label>
              <input
                type="text"
                className="form-control"
                {...register("addressGoogle")}
                id=""
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="form-group w-45">
              <label for="">Điện thoại</label>
              <input
                type="text"
                className="form-control"
                {...register("phone")}
                id=""
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div className="form-group w-45">
              <label for="">Mức lương</label>
              <Input.Group compact className="w-100">
                <Input
                  style={{ width: "45%", textAlign: "center" }}
                  onChange={onChangePrice1}
                  placeholder="Ít nhất"
                />
                <Input
                  className="site-input-split"
                  style={{
                    width: "10%",
                    textAlign: "center",
                  }}
                  placeholder="~"
                  disabled
                />
                <Input
                  className="site-input-right"
                  style={{
                    width: "45%",
                    textAlign: "center",
                  }}
                  onChange={onChangePrice2}
                  placeholder="Nhiều nhất"
                />
              </Input.Group>
              <small>Không nhập nếu bạn muốn thương lượng</small>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-group w-45">
              <label htmlFor="">Hạn chót</label>
              <Space direction="vertical" className="w-100">
                <DatePicker
                  onChange={onChangeDate}
                  className="form-control input-ant"
                />
              </Space>
            </div>
            <div className="form-group w-45">
              <label htmlFor="">Tag liên quan</label>
              {loadingTag ? (
                <SpinLoad />
              ) : (
                <Select
                  mode="tags"
                  onChange={onChangeTag}
                  className="form-control"
                  placeholder="Tags Mode"
                >
                  {data}
                </Select>
              )}
            </div>
          </div>
          <div className="d-flex">
            <div className="form-group w-45">
              <label htmlFor="">Tính chất công việc</label>
              <Select
                defaultValue="Full Time"
                onChange={onChangeNature}
                className="form-control w-100"
              >
                <Option value="Full Time">Full Time</Option>
                <Option value="Part Time">Part Time</Option>
              </Select>
            </div>
            <div className="form-group w-45">
              <label htmlFor="">Yêu cầu bằng cấp</label>
              <Select
                defaultValue="Không yêu cầu"
                onChange={onChangeRequest}
                className="form-control w-100"
              >
                <Option value="Không yêu cầu">Không yêu cầu</Option>
                <Option value="Cao đẳng">Cao đẳng</Option>
                <Option value="Đại học">Đại học</Option>
                <Option value="Cao học">Cao học</Option>
                <Option value="Tiến sỹ">Tiến sỹ</Option>
                <Option value="Thạc sỹ">Thạc sỹ</Option>
              </Select>
            </div>
          </div>
          <div className="form-group w-45">
            <label htmlFor="">Loại công việc</label>
            {loadingTypeWork ? (
              <SpinLoad />
            ) : (
              <Select
                value={typeofworkId}
                onChange={onChangeTypeWork}
                className="form-control w-100"
              >
                {typeWorks.rows.map((data) => (
                  <Option value={data.id}>{data.name}</Option>
                ))}
              </Select>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="">Mô tả</label>
            <JoditEditor
              value={description}
              tabIndex={1}
              onChange={(e) => setDescripton(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">quyền lợi được hưởng</label>
            <JoditEditor
              value={interest}
              tabIndex={1}
              onChange={(e) => setInterest(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Yêu cầu công việc</label>
            <JoditEditor
              value={form}
              tabIndex={1}
              onChange={(e) => setForm(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Yêu cầu kinh nghiệm</label>
            <JoditEditor
              value={exprience}
              tabIndex={1}
              onChange={(e) => setExprience(e)}
            />
          </div>
          {load ? (
            <SpinLoad />
          ) : (
            <div className="text-center mtb">
              {" "}
              <input type="submit" value="Tạo công việc" />{" "}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
