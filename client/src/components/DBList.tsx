import React, { ChangeEvent, useState } from 'react';
import {
  AllDataAndDescription,
  EditData,
  UserInfo,
} from '../interface/functionInterface';
import EditIcon from '@mui/icons-material/Edit';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';
import '../styles/dbList.css';
import { editValidate } from '../controller/dataController';
import dbApi from '../api/getData';
import Modal from './Modal';

const DBList: React.FC<AllDataAndDescription & { user: UserInfo }> = (
  props
) => {
  const { allData, setAllData, isModal, setIsModal, user } = props;
  // console.log(allData);
  const [editName, setEditName] = useState<string>('');
  const [editCreateDate, setEditCreateDate] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const clickHandler = async (id: number) => {
    console.log('id : ', id);

    if (editIndex !== null) {
      if (editIndex !== id) {
        window.alert('他が編集中です。編集を終了してください');
        return;
      } else {
        if (editValidate(editName, editCreateDate, editDescription) !== '') {
          window.alert(editValidate(editName, editCreateDate, editDescription));
          return;
        }
        const index = allData.findIndex((elm) => elm.id === id);
        if (index === -1) return;
        const tempAlldata = [...allData];
        tempAlldata[index].edit = !tempAlldata[index].edit;
        const changeData: EditData = {};
        if (tempAlldata[index].project_name !== editName) {
          changeData.project_name = editName;
          tempAlldata[index].project_name = editName;
        }
        if (tempAlldata[index].create_date !== editCreateDate) {
          changeData.create_date = editCreateDate;
          tempAlldata[index].create_date = editCreateDate;
        }
        if (tempAlldata[index].description !== editDescription) {
          changeData.description = editDescription;
          tempAlldata[index].description = editDescription;
        }
        console.log('changeData : ', changeData);
        try {
          const res = await dbApi.update(editIndex, changeData);
          console.log('res : ', res);
          setEditIndex(null);
          setAllData(tempAlldata);
          setEditName('');
          setEditCreateDate('');
          setEditDescription('');
        } catch (err) {
          throw Error(`error : ${err}`);
        }
      }
    } else {
      setEditIndex(id);
      const index = allData.findIndex((elm) => elm.id === id);
      if (index === -1) return;
      const tempAlldata = [...allData];
      tempAlldata[index].edit = !tempAlldata[index].edit;
      setAllData(tempAlldata);
      setEditName(tempAlldata[index].project_name);
      setEditCreateDate(tempAlldata[index].create_date);
      setEditDescription(tempAlldata[index].description);
    }
  };

  const changePjtName = (event: ChangeEvent<HTMLInputElement>) => {
    setEditName(event.target.value);
  };

  const changeCreateDate = (event: ChangeEvent<HTMLInputElement>) => {
    setEditCreateDate(event.target.value);
  };

  const changeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setEditDescription(event.target.value);
  };

  const deleteHandler = async (id: number) => {
    if (window.confirm('本当に消しますか？')) {
      const index = allData.findIndex((elm) => elm.id === id);
      if (index === -1) return;
      await dbApi.delete(id);
      const tempAllData = [...allData];
      tempAllData.splice(index, 1);
      setAllData(tempAllData);
    }
  };

  const addHandler = () => {
    setIsModal(!isModal);
  };

  return (
    <div>
      {isModal && (
        <Modal setIsModal={setIsModal} setAllData={setAllData} user={user} />
      )}
      <AddBoxIcon onClick={addHandler} />
      <div className="table">
        <table border={1} style={{ height: '50px' }}>
          <thead>
            <tr>
              <th>id</th>
              <th>project name</th>
              <th>date</th>
              <th>description</th>
              <th>like</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((elm) => {
              return (
                <tr key={elm.id}>
                  <td align="center" width={'5%'}>
                    {elm.id}
                  </td>
                  <td width={'40%'}>
                    {elm.edit ? (
                      <input
                        className="modify_content edit-input"
                        type="text"
                        value={editName}
                        onChange={changePjtName}
                      />
                    ) : (
                      <label className="modify_content">
                        {elm.project_name}
                      </label>
                    )}
                  </td>
                  <td>
                    {elm.edit ? (
                      <input
                        className="modify_content small-size edit-input"
                        type="text"
                        value={editCreateDate}
                        onChange={changeCreateDate}
                      />
                    ) : (
                      <label className="modify_content small-size">
                        {elm.create_date}
                      </label>
                    )}
                  </td>
                  <td width={'35%'}>
                    {elm.edit ? (
                      <input
                        className="modify_content edit-input"
                        type="text"
                        value={editDescription}
                        onChange={changeDescription}
                      />
                    ) : (
                      <label className="modify_content">
                        {elm.description}
                      </label>
                    )}
                  </td>
                  <td>{String(allData[0].like)}</td>
                  <td align="center">
                    {elm.edit ? (
                      <BorderColorIcon
                        className="edit__Icon--doing"
                        onClick={() => {
                          clickHandler(elm.id);
                        }}
                      />
                    ) : (
                      <EditIcon
                        className="edit__Icon--default"
                        onClick={() => {
                          clickHandler(elm.id);
                        }}
                      />
                    )}
                  </td>
                  <td align="center">
                    <DeleteForeverIcon
                      onClick={() => {
                        deleteHandler(elm.id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DBList;
