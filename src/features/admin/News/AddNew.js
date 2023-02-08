import { Select, Spin } from "antd";
import { Option } from "antd/lib/mentions";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import newApi from "../../../api/newApi";
import tagNewApi from "../../../api/tagNewApi";
import { storage } from "../../../firebase";
import { checkArrayEquar } from "../../container/Functionjs";
import { addnew, newData, updatenew } from "../Slice/newSlice";
import { tagData } from "../Slice/tagSlice";

export default function AddNew() {
  const { id } = useParams();
  const [state, setState] = useState({
    load: false,
    linkImg: "",
    tenanh: "",
    img: "",
    anh: "",
    tagId: "",
    tag1: "",
  });
  const { linkImg, tenanh, img, anh, tagId, tag1 } = state;
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const actiontag = async () => {
    await dispatch(tagData({ status: 1 }));
  };
  const actionResult = async (page) => {
    await dispatch(newData(page));
  };
  const getApi = async () => {
    return await newApi.getOne(id).then((data) => {
      return data;
    });
  };
  const getTag = (e) => {
    let tag = [];
    for (let i = 0; i < e.length; i++) {
      tag.push(`${e[i].id}`);
    }
    return tag;
  };
  useEffect(async () => {
    actiontag();
    if (id) {
      Promise.all([getApi()]).then(function (data) {
        setContent(data[0].content);
        reset(data[0]);
        setState({
          ...state,
          anh: data[0].avatar,
          tagId: getTag(data[0].Tags),
          tag1: getTag(data[0].Tags),
        });
      });
      // reset(await newApi.getOne(id).then(data => {
      //     return data
      // }));
      // console.log(getApi());
    }
  }, []);
  const history = useHistory();
  const tags = useSelector((state) => state.tags.tag.data);
  const loadingTag = useSelector((state) => state.tags.loading);
  const onhandleSubmit = async (data) => {
    const { tagId } = state;
    setState({
      ...state,
      load: true,
    });
    if (id) {
      if (img !== "") {
        await storage.ref(`imagesNew/${img.name}`).put(img);
        const anh = await storage
          .ref("imagesNew")
          .child(img.name)
          .getDownloadURL();
        if (tag1 === tagId) {
          dispatch(
            updatenew({
              name: data.name,
              samary: data.samary,
              avatar: anh,
              content: content,
              id: id,
            })
          );
        } else {
          await tagNewApi.deletetagNew(id);
          var data = [];
          for (let i = 0; i < tagId.length; i++) {
            let tag = tagId[i];
            data.push({ newId: id, tagId: tag });
          }
          await tagNewApi.posttagNew(data);
          await dispatch(
            updatenew({
              name: data.name,
              samary: data.samary,
              avatar: anh,
              content: content,
              id: id,
            })
          );
        }
      } else {
        if (checkArrayEquar(tagId, tag1)) {
          dispatch(
            updatenew({
              name: data.name,
              samary: data.samary,
              content: content,
              id: id,
            })
          );
        } else {
          await tagNewApi.deletetagNew(id);
          var data = [];
          for (let i = 0; i < tagId.length; i++) {
            let tag = tagId[i];
            data.push({ newId: id, tagId: tag });
          }
          console.log(data);
          await tagNewApi.posttagNew(data);
          await dispatch(
            updatenew({
              name: data.name,
              samary: data.samary,
              content: content,
              id: id,
            })
          );
        }
      }
    } else {
      await storage.ref(`imagesNew/${img.name}`).put(img);
      const anh = await storage
        .ref("imagesNew")
        .child(img.name)
        .getDownloadURL();
      var tagnew = [];
      for (let i = 0; i < tagId.length; i++) {
        tagnew.push({ tagId: tagId[i] });
      }
      dispatch(
        addnew({
          name: data.name,
          samary: data.samary,
          content: content,
          avatar: anh,
          useId: 1,
          status: 0,
          tagnew: tagnew,
        })
      );
    }
    setTimeout(() => {
      actionResult({ page: localStorage.getItem("pageNew") || 1 });
    }, 800);
    history.push("/admin/new");
  };
  const onChangeTag = (e) => {
    setState({
      ...state,
      tagId: e,
    });
  };
  const hangdelimage = (e) => {
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      tenanh: e.target.files[0].name,
      img: e.target.files[0],
    });
  };
  const data = [];

  if (!loadingTag) {
    tags.rows.map((ok) => {
      data.push(<Option key={ok.id}>{ok.name}</Option>);
    });
  }
  return (
    <div id="admin">
      <div className="heading">
        <div className="heading__title">
          <h3>{id ? "Sửa tin tức" : "Thêm tin tức"}</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit(onhandleSubmit)}>
          <div className="form-group">
            <div className="mt-3">
              <label htmlFor="">Tên bài viết</label>
              <input
                {...register("name", { required: true })}
                className="form-control w-50"
                placeholder=""
                aria-describedby="helpId"
              />
              {errors.name && (
                <span className="text-danger">Bạn không được để trống!</span>
              )}
            </div>
            <div className="mt-3">
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
                <img
                  src={linkImg}
                  className="ml-3"
                  height="150px"
                  width="250px"
                  alt=""
                />
              ) : anh ? (
                <img
                  src={anh}
                  className="ml-5"
                  height="150px"
                  width="250px"
                  alt=""
                />
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
              <label htmlFor="">Tags liên quan</label>
              <br />
              {loadingTag ? (
                <div className="spin">
                  <Spin className="mt-5" />
                </div>
              ) : (
                <Select
                  value={tagId ? tagId : []}
                  mode="tags"
                  onChange={onChangeTag}
                  className="w-50 ml-4"
                  placeholder="Tags Mode"
                >
                  {data}
                </Select>
              )}
            </div>
            <div className="mt-3">
              <label htmlFor="">Tóm tắt</label>
              <textarea
                {...register("samary", { required: true })}
                className="form-control w-50"
                id=""
                cols="30"
                rows="4"
              ></textarea>
              {errors.samary && (
                <span className="text-danger">Bạn không được để trống!</span>
              )}
            </div>
            <div className="mt-3">
              <label htmlFor="">Nội dung</label>
              <JoditEditor
                value={content}
                tabIndex={1}
                onChange={(e) => setContent(e)}
              />
            </div>
          </div>
          <div className="text-center mtb">
            {id ? (
              <input type="submit" value="Sửa" />
            ) : (
              <input type="submit" value="Thêm mới" />
            )}
            {state.load ? (
              <div className="spin">
                <Spin className="mt-5" />
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
