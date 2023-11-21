import React, { ChangeEvent, useState } from "react";
import { EditData, ModalType, RawData } from "../interface/functionInterface";
import "../styles/modal.css";
import { addUrl, editValidate } from "../controller/dataController";
import dbApi from "../api/getData";

const Modal: React.FC<ModalType> = (props) => {
  const { setIsModal, setAllData } = props;
  const [addName, setAddName] = useState("");
  const [addDate, setAddDate] = useState("");
  const [addDescription, setAddDescription] = useState("");

  const clickHandler = async () => {
    if (editValidate(addName, addDate, addDescription) !== "") {
      window.alert(editValidate(addName, addDate, addDescription));
      return;
    }
    const tempAdd: EditData = {
      project_name: addName,
      create_date: addDate,
      description: addDescription,
      like: false,
    };
    // console.log("tempAdd :", tempAdd);
    try {
      await dbApi.createData(tempAdd);
      const tempAllRes = await dbApi.getAll();
      const tempData: RawData[] = tempAllRes.data;
      const changeRes = addUrl(tempData);

      //   console.log("res :", res);
      setIsModal(false);
      setAllData(changeRes);
    } catch (err) {
      throw Error(`err : ${err}`);
    }
  };

  const cancelHandler = () => {
    setAddName("");
    setAddDate("");
    setAddDescription("");
    setIsModal(false);
  };

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setAddName(event.target.value);
  };

  const changeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setAddDate(event.target.value);
  };

  const changeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setAddDescription(event.target.value);
  };

  return (
    <div className="modal__container">
      <div className="modal__wrap">
        <div className="modal_content">
          <div className="modal_subject">
            <label htmlFor="">project name</label>
          </div>
          <div>
            <input
              type="text"
              className="input"
              onChange={changeName}
              placeholder="プロジェクト名を入力してください"
              value={addName}
            />
          </div>
        </div>
        <div className="modal_content">
          <div className="modal_subject">
            <label htmlFor="">create date</label>
          </div>
          <div>
            <input
              type="text"
              className="input"
              onChange={changeDate}
              placeholder="日付を入力してください"
              value={addDate}
            />
          </div>
        </div>
        <div className="modal_content">
          <div className="modal_subject">
            <label htmlFor="">description</label>
          </div>
          <div>
            <input
              type="text"
              className="input"
              onChange={changeDescription}
              placeholder="descriptionを入力してください"
              value={addDescription}
            />
          </div>
        </div>
        <div className="user__button">
          <div>
            <button
              className="add__button modal_content"
              onClick={clickHandler}
            >
              新規作成
            </button>
          </div>
          <div>
            <button
              className="add__button modal_content"
              onClick={cancelHandler}
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
