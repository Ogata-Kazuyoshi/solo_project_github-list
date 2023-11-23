import React from 'react';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import CurrentList from './components/CurrentList';
import DBList from './components/DBList';
import dbApi from './api/getData';
import { addUrl, createDescription } from './controller/dataController';
import {
  ChangedData,
  DescriptionType,
  IsAuthChange,
  RawData,
} from './interface/functionInterface';
import { useNavigate } from 'react-router-dom';

const TOP: React.FC<IsAuthChange> = (props) => {
  const { isAuth, setIsAuth, user } = props;
  const [viewAll, setViewAll] = useState<boolean>(true);
  const [allData, setAllData] = useState<ChangedData[]>([]);
  const [checkedData, setCheckedData] = useState<ChangedData[]>([]);
  const [description, setDescription] = useState<DescriptionType[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate('/auth/login');
    if (isAuth) {
      const getData = async () => {
        const res = await dbApi.getAll();
        // console.log('res : ', res);
        const tempData: RawData[] = res.data;
        const changeRes = addUrl(tempData, user!.username);
        // console.log("changeRes : ", changeRes);
        setAllData(changeRes);
        const onlyDescription = createDescription(
          tempData.map((elm) => elm.description)
        );
        // console.log("onlyDescription", onlyDescription);
        setDescription(onlyDescription);
      };
      getData();
    }
  }, [user]);

  useEffect(() => {
    const checkDescription = description
      .filter((elm) => elm.isVisible === true)
      .map((elm) => elm.description);
    const tempCheckedData = allData.filter((elm) => {
      for (const check of checkDescription) {
        if (!elm.description.includes(check)) return false;
      }
      return true;
    });
    setCheckedData(tempCheckedData);
  }, [description]);

  return (
    <div className="TOP">
      <Header
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        description={description}
        setDescription={setDescription}
        viewAll={viewAll}
        setViewAll={setViewAll}
        user={user}
      />
      {viewAll ? (
        <CurrentList checkedData={checkedData} />
      ) : (
        <DBList
          description={description}
          setDescription={setDescription}
          allData={allData}
          setAllData={setAllData}
          isModal={isModal}
          setIsModal={setIsModal}
        />
      )}
    </div>
  );
};

export default TOP;
