import React from 'react';
import '../../styles/Header_Components/selectPages.css';
import { IsAuthChange, ViewAll } from '../../interface/functionInterface';
import LogoutIcon from '@mui/icons-material/Logout';
import BackupIcon from '@mui/icons-material/Backup';
import authApi from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import dbApi from '../../api/getData';

const SelectPages: React.FC<ViewAll & IsAuthChange> = (props) => {
  const { viewAll, setViewAll, isAuth, setIsAuth, user } = props;
  const navigate = useNavigate();
  const clickHandler = (arg: 'all' | 'modify') => {
    switch (arg) {
      case 'all':
        if (!viewAll) setViewAll(!viewAll);
        break;
      case 'modify':
        if (viewAll) setViewAll(!viewAll);
        break;
    }
  };

  const clickLogout = async () => {
    const res = await authApi.logout();
    if (res.data.message === 'Logout successful') {
      setIsAuth(!isAuth);
      navigate('/auth/login');
    }
  };

  const backupHandler = async () => {
    const res = await dbApi.savedata();
    window.alert(res.data);
  };

  return (
    <div className="header__button">
      <LogoutIcon onClick={clickLogout} className="header__logout" />
      <div className="selectbutton">
        <div
          className="selectbutton__common"
          style={{
            background: viewAll ? 'black' : 'white',
            color: viewAll ? 'white' : 'black',
          }}
          onClick={() => {
            clickHandler('all');
          }}
        >
          一覧
        </div>
        <div
          className="selectbutton__common"
          style={{
            background: !viewAll ? 'black' : 'white',
            color: !viewAll ? 'white' : 'black',
          }}
          onClick={() => {
            clickHandler('modify');
          }}
        >
          作成/編集
        </div>
      </div>
      {user!.username === 'Ogata-Kazuyoshi' && (
        <BackupIcon onClick={backupHandler} className="backupIcon" />
      )}
    </div>
  );
};

export default SelectPages;
