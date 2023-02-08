import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { message, Select } from "antd";
import { Option } from "antd/lib/mentions";
import { useEffect } from "react";
import { storage } from "../../../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import SpinLoad from "../../../Spin/Spin";
import { useHistory } from "react-router-dom";
import userApi from "../../../../../api/userApi";
import userTypeOfWorkApi from "../../../../../api/userTypeOfWorkApi";
import userTagApi from "../../../../../api/userTagApi";
import { updateuser, userData } from "../../../../admin/Slice/userSlice";
import { tagData } from "../../../../admin/Slice/tagSlice";
import { typeWorkData } from "../../../../admin/Slice/typeWorkSlice";
import { checkArrayEquar } from "../../../../container/Functionjs";
export default function Infor({ id }) {
  const [state, setState] = useState({
    typeofworkId: "",
    typeofworkCheck: "",
    tagId: "",
    tagCheck: "",
    loading: false,
    linkImg: "",
    tenanh: "",
    img: "",
    anh: "",
    linkImgBanner: "",
    tenanhBanner: "",
    imgBanner: "",
    anhBanner: "",
  });
  const {
    loading,
    linkImg,
    tenanh,
    img,
    typeofworkId,
    anh,
    linkImgBanner,
    tenanhBanner,
    typeofworkCheck,
    tagCheck,
    imgBanner,
    anhBanner,
    tagId,
  } = state;
  const { register, handleSubmit, reset } = useForm();
  const [content, setContent] = useState();
  const dispatch = useDispatch();

  const [male, setMale] = useState("");
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
  const getApi = async () => {
    return await userApi.getOne(id).then((data) => {
      return data;
    });
  };
  const formatTag = (e) => {
    let tag = [];
    for (let i = 0; i < e.length; i++) {
      tag.push(`${e[i].id}`);
    }
    return tag;
  };
  const formatTypeOfWork = (e) => {
    let TypeOfWork = [];
    for (let i = 0; i < e.length; i++) {
      TypeOfWork.push(e[i].id);
    }
    return TypeOfWork;
  };
  useEffect(() => {
    actionResultTag();
    actionResultTypeOfWork();
    if (id) {
      Promise.all([getApi()]).then(function (data) {
        setContent(data[0].introduce);
        setMale(data[0].male);
        reset(data[0]);
        setState({
          ...state,
          anh: data[0].avatar,
          anhBanner: data[0].banner,
          tagId: formatTag(data[0].Tags),
          tagCheck: formatTag(data[0].Tags),
          typeofworkId: formatTypeOfWork(data[0].TypeOfWorks),
          typeofworkCheck: formatTypeOfWork(data[0].TypeOfWorks),
        });
      });
    }
  }, []);
  const actionResult = async (page) => {
    await dispatch(userData(page));
  };
  const edit = async (data) => {
    const TypeOfWorks = [{ userId: id, typeofworkId: typeofworkId }];
    const UserTag = [];
    for (let i = 0; i < tagId.length; i++) {
      UserTag.push({ userId: id, tagId: tagId[i] });
    }
    if (!checkArrayEquar(typeofworkCheck, typeofworkId)) {
      await userTypeOfWorkApi.deleteuserTypeOfWork(id);
      await userTypeOfWorkApi.postuserTypeOfWork(TypeOfWorks);
    }
    if (!checkArrayEquar(tagId, tagCheck)) {
      await userTagApi.deleteuserTag(id);
      await userTagApi.postuserTag(UserTag);
    }
    if (data.anh && data.anhBanner === undefined) {
      await dispatch(
        updateuser({
          status: 1,
          avatar: data.anh,
          name: data.name,
          address: data.address,
          male,
          phone: data.phone,
          introduce: content,
          id: id,
        })
      );
    } else if (data.anhBanner && data.anh === undefined) {
      await dispatch(
        updateuser({
          status: 1,
          banner: data.anhBanner,
          name: data.name,
          address: data.address,
          male,
          phone: data.phone,
          introduce: content,
          id: id,
        })
      );
    } else if (data.anhBanner && data.anh) {
      await dispatch(
        updateuser({
          status: 1,
          avatar: data.anh,
          banner: data.anhBanner,
          name: data.name,
          male,
          address: data.address,
          phone: data.phone,
          introduce: content,
          id: id,
        })
      );
    } else {
      await dispatch(
        updateuser({
          status: 1,
          name: data.name,
          address: data.address,
          phone: data.phone,
          male,
          introduce: content,
          id: id,
        })
      );
    }
  };
  const history = useHistory();
  const onSubmit = async (data) => {
    console.log(data);
    if (
      data.phone === "" ||
      tagId.length === 0 ||
      typeofworkId.length === 0 ||
      content === ""
    ) {
      message.warning("Bạn cần nhập đầy đủ thông tin!");
    } else {
      setState({
        ...state,
        loading: true,
      });
      if (img !== "" || imgBanner !== "") {
        if (img !== "" && imgBanner === "") {
          await storage.ref(`imagesuser/${img.name}`).put(img);
          const anh = await storage
            .ref("imagesuser")
            .child(img.name)
            .getDownloadURL();
          edit({ data, anh });
        } else if (imgBanner !== "" && img === "") {
          await storage.ref(`imagesuser/${imgBanner.name}`).put(imgBanner);
          const anhBanner = await storage
            .ref("imagesuser")
            .child(imgBanner.name)
            .getDownloadURL();
          edit({ data, anhBanner });
        } else {
          await storage.ref(`imagesuser/${img.name}`).put(img);
          const anh = await storage
            .ref("imagesuser")
            .child(img.name)
            .getDownloadURL();
          await storage.ref(`imagesuser/${imgBanner.name}`).put(imgBanner);
          const anhBanner = await storage
            .ref("imagesuser")
            .child(imgBanner.name)
            .getDownloadURL();

          edit({ data, anh, anhBanner });
        }
      } else {
        edit(data);
      }
      setTimeout(() => {
        actionResult({ page: 1 });
      }, 800);
      history.push(`/candidates/${id}`);
    }
  };
  const hangdelimage = (e) => {
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      tenanh: e.target.files[0].name,
      img: e.target.files[0],
    });
  };
  const hangdelimageBanner = (e) => {
    setState({
      ...state,
      linkImgBanner: URL.createObjectURL(e.target.files[0]),
      tenanhBanner: e.target.files[0].name,
      imgBanner: e.target.files[0],
    });
  };
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
  const onChangeTypeWork = (e) => {
    setState({
      ...state,
      typeofworkId: e,
    });
  };
  return (
    <div className="infor">
      <div className="heading">
        <div className="heading__title">
          <h3>Thông tin cá nhân</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="content">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group ">
            <label htmlFor="">Ảnh đại diện</label>
            <label htmlFor="img">
              <div className="btn_camera">
                <i className="fas fa-camera-retro"></i>
              </div>
            </label>
            <input
              type="file"
              hidden="true"
              name=""
              id="img"
              onChange={hangdelimage}
            />
            {linkImg ? (
              <img src={linkImg} className="ml-3" height="150px" alt="" />
            ) : anh ? (
              <img src={anh} className="ml-5" height="150px" alt="" />
            ) : (
              ""
            )}
            <br />
            {tenanh ? (
              <span>
                <span className="text-danger">Tên ảnh</span>: {tenanh}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label htmlFor="">Ảnh banner</label>
            <label htmlFor="imgBanner">
              <div className="btn_camera">
                <i className="far fa-images"></i>
              </div>
            </label>
            <input
              type="file"
              hidden="true"
              name=""
              id="imgBanner"
              onChange={hangdelimageBanner}
            />
            {linkImgBanner ? (
              <img src={linkImgBanner} className="ml-3" height="150px" alt="" />
            ) : anhBanner ? (
              <img
                src={anhBanner}
                className="ml-5"
                height="150px"
                width="250px"
                alt=""
              />
            ) : (
              ""
            )}
            <br />
            {tenanhBanner ? (
              <span>
                <span className="text-danger">Tên ảnh</span>: {tenanhBanner}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex">
            <div className="form-group w-45 ">
              <label for="">Tên ứng viên</label>
              <input
                type="text"
                className="form-control "
                {...register("name")}
                id=""
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
            <div className="form-group w-45">
              <label for="">Địa chỉ</label>
              <input
                type="text"
                className="form-control"
                {...register("address")}
                id=""
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="form-group w-45">
              <label for="">Giới tính</label>
              <Select
                value={male}
                onChange={(e) => setMale(e)}
                className="form-control w-100"
              >
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            </div>
            <div className="form-group w-45">
              <label for="">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                {...register("phone")}
                id=""
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="form-group w-45">
              <label htmlFor="">Tag liên quan</label>
              {loadingTag ? (
                <SpinLoad />
              ) : (
                <Select
                  mode="tags"
                  value={tagId ? tagId : ""}
                  onChange={onChangeTag}
                  className="form-control"
                  placeholder="Tags Mode"
                >
                  {data}
                </Select>
              )}
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
          </div>
          <div className="form-group">
            <label htmlFor="">Giới thiệu bản thân</label>
            <JoditEditor
              value={content}
              tabIndex={1}
              onChange={(e) => setContent(e)}
            />
          </div>
          {loading ? (
            <SpinLoad />
          ) : (
            <div className="text-center mtb">
              <input type="submit" value="Cập nhật" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
