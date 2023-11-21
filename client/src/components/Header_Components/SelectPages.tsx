import React from 'react';
import '../../styles/Header_Components/selectPages.css';
import { IsAuthChange, ViewAll } from '../../interface/functionInterface';
import LogoutIcon from '@mui/icons-material/Logout';
import authApi from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const SelectPages: React.FC<ViewAll & IsAuthChange> = (props) => {
  const { viewAll, setViewAll, isAuth, setIsAuth } = props;
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
      navigate('/login');
    }
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
    </div>
  );
};

export default SelectPages;
